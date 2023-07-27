"use server";

import { pusherServer } from "@/libs/pusherServer";
import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function markAsSeen(conversationId: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        throw new Error("Unauthorized");
    }

    const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId,
        },
        include: {
            messages: {
                include: {
                    seen: true,
                },
            },
            users: true,
        },
    });

    if (!conversation) {
        throw new Error("Invalid ID");
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
        return conversation;
    }

    const updatedMessage = await prisma.message.update({
        where: {
            id: lastMessage.id,
        },
        include: {
            author: true,
            seen: true,
        },
        data: {
            seen: {
                connect: {
                    id: currentUser.id,
                },
            },
        },
    });

    await pusherServer.trigger(currentUser.id, "conversation:update", {
        id: conversationId,
        messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
        return conversation;
    }

    await pusherServer.trigger(
        conversationId!,
        "message:update",
        updatedMessage
    );
}
