"use server";

import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusherServer";

export default async function createConversation(
    userId: string,
    isGroup: boolean = false,
    members?: string[],
    name?: string
) {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
        return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
        return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
        const newConversation = await prisma.conversation.create({
            data: {
                name,
                isGroup,
                users: {
                    connect: [
                        ...members.map((memberId) => ({
                            id: memberId,
                        })),
                        {
                            id: currentUser.id,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        });

        newConversation.users.forEach((user) => {
            pusherServer.trigger(user.id, "conversation:new", newConversation);
        });

        return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    userIds: {
                        equals: [currentUser.id, userId],
                    },
                },
                {
                    userIds: {
                        equals: [userId, currentUser.id],
                    },
                },
            ],
        },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
        return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
        data: {
            users: {
                connect: [
                    {
                        id: currentUser.id,
                    },
                    {
                        id: userId,
                    },
                ],
            },
        },
        include: {
            users: true,
        },
    });

    newConversation.users.map((user) => {
        pusherServer.trigger(user.id, "conversation:new", newConversation);
    });

    return NextResponse.json(newConversation);
}
