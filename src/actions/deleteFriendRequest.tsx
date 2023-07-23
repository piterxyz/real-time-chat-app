"use server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusherServer";
import { revalidatePath } from "next/cache";

export default async function deleteFriendRequest(
    senderId: string,
    receiverId: string
) {
    const exist = await prisma.friendRequest.findFirst({
        where: {
            senderId,
            receiverId,
        },
    });

    if (!exist) throw new Error("The friend request has not been found.");

    const friendRequest = await prisma.friendRequest.delete({
        where: {
            id: exist.id,
        },
    });

    revalidatePath("/requests");
    await pusherServer.trigger(senderId, "friendRequest:delete", friendRequest);
    await pusherServer.trigger(
        receiverId,
        "friendRequest:delete",
        friendRequest
    );

    return friendRequest;
}
