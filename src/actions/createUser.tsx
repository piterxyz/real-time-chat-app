"use server";

import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function createUser(nickname: string, password: string) {
    const exist = await prisma.user.findUnique({
        where: {
            nickname,
        },
    });

    if (exist) throw new Error("Nickname already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            nickname,
            password: hashedPassword,
        },
    });

    return user;
}
