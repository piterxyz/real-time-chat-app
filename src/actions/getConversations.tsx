import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export default async function getConversations() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    const conversations = await prisma.conversation.findMany({
        orderBy: {
            lastMessageAt: "desc",
        },
        where: {
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

    return conversations;
}
