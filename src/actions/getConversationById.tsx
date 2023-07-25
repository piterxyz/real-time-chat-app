import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export default async function getConversationById(conversationId: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    const conversation = await prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userIds: {
                has: currentUser.id,
            },
        },
        include: {
            users: true,
            messages: {
                include: {
                    author: true,
                    seen: true,
                    repliedTo: {
                        include: {
                            repliedTo: {
                                include: {
                                    author: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return conversation;
}
