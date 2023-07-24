"use server";

import prisma from "@/libs/prismadb";
import deleteFriendRequest from "./deleteFriendRequest";
import { revalidatePath } from "next/cache";

export default async function acceptFriendRequest(
    senderId: string,
    receiverId: string
) {
    await prisma.user.update({
        where: {
            id: senderId,
        },
        data: {
            friends: {
                connect: {
                    id: receiverId,
                },
            },
            friendOf: {
                connect: {
                    id: receiverId,
                },
            },
        },
    });

    await prisma.user.update({
        where: {
            id: receiverId,
        },
        data: {
            friends: {
                connect: {
                    id: senderId,
                },
            },
            friendOf: {
                connect: {
                    id: senderId,
                },
            },
        },
    });

    deleteFriendRequest(senderId, receiverId);
    revalidatePath("/requests");
}
