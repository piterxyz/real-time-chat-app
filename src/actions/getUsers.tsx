import prisma from "@/libs/prismadb";

export default async function getUsers() {
    return await prisma.user.findMany({
        include: {
            incomingFriendRequests: {
                include: {
                    sender: true,
                    receiver: true,
                },
            },
            outgoingFriendRequests: {
                include: {
                    sender: true,
                    receiver: true,
                },
            },
        },
    });
}
