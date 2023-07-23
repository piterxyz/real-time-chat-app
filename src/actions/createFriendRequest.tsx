"use server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusherServer";
import { revalidatePath } from "next/cache";

export default async function createFriendRequest(
    senderId: string,
    receiverId: string
) {
    const exist = await prisma.friendRequest.findFirst({
        where: {
            senderId,
            receiverId,
        },
    });

    if (exist) throw new Error("You can't duplicate the friend request.");

    const friendRequest = await prisma.friendRequest.create({
        data: {
            senderId,
            receiverId,
        },
        include: {
            sender: true,
            receiver: true,
        },
    });

    revalidatePath("/requests");
    await pusherServer.trigger(receiverId, "friendRequest:new", friendRequest);
    await pusherServer.trigger(senderId, "friendRequest:new", friendRequest);

    return friendRequest;
}
