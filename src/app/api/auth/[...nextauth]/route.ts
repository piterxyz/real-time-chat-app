import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                nickname: { label: "nickname", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.nickname || !credentials?.password) {
                    throw new Error(
                        "Please fill in the nickname and password."
                    );
                }

                const user = await prisma.user.findUnique({
                    where: {
                        nickname: credentials?.nickname,
                    },
                });

                if (!user || !user?.password) {
                    throw new Error("User not found.");
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user as User;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
