import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { nickname, password } = body;

    const exist = await prisma.user.findUnique({
        where: {
            nickname,
        },
    });

    if (exist)
        return new NextResponse("Nickname already exists", { status: 401 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            nickname,
            password: hashedPassword,
        },
    });

    return NextResponse.json(user);
}
