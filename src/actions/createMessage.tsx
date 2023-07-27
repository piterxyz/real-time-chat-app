"use server";

import { pusherServer } from "@/libs/pusherServer";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export default async function createMessage(
    message: string,
    conversationId: string
) {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        throw new Error("Unauthorized");
    }

    const newMessage = await prisma.message.create({
        include: {
            seen: true,
            author: true,
        },
        data: {
            content: message,
            conversation: {
                connect: { id: conversationId },
            },
            author: {
                connect: { id: currentUser.id },
            },
            seen: {
                connect: {
                    id: currentUser.id,
                },
            },
        },
    });

    const updatedConversation = await prisma.conversation.update({
        where: {
            id: conversationId,
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id,
                },
            },
        },
        include: {
            users: true,
            messages: {
                include: {
                    seen: true,
                },
            },
        },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
        updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
        pusherServer.trigger(user.id!, "conversation:update", {
            id: conversationId,
            messages: [lastMessage],
        });
    });

    revalidatePath("/conversations");

    return newMessage;
}
