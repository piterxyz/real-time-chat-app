import prisma from "@/libs/prismadb";
import getSession from "./getSession";

export default async function getCurrentUser() {
    const session = await getSession();

    if (!session?.user?.nickname) {
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            nickname: session.user.nickname,
        },
        include: {
            conversations: true,
            seenMessages: true,
            messages: true,
            outgoingFriendRequests: {
                include: {
                    receiver: true,
                    sender: true,
                },
            },
            incomingFriendRequests: {
                include: {
                    receiver: true,
                    sender: true,
                },
            },
        },
    });

    if (!currentUser) {
        return null;
    }

    return currentUser;
}
