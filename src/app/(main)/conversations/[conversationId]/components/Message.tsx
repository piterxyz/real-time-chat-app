"use client";

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types/full-prisma";
import getInitials from "@/utils/getInitials";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

export default function Message({
    message,
    isLast,
}: {
    message: FullMessageType;
    isLast: boolean;
}) {
    const { data: session } = useSession();

    const isOwn = message.authorId == session?.user?.id;
    const seenList = (message.seen || [])
        .filter((user) => user.id !== message.authorId)
        .map((user) => user.nickname)
        .join(", ");

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
    const avatar = clsx(isOwn && "order-2");
    const body = clsx("flex flex-col flex-1 gap-2", isOwn && "items-end");
    const msg = clsx(
        "text-sm w-fit break-all max-w-[50%] overflow-hidden text-white p-3 rounded-xl",
        isOwn ? "bg-[#1d90f5]" : "bg-[#424656]"
    );

    return (
        <div className={container} id={message.id}>
            <div className={avatar}>
                <Avatar
                    initials={getInitials(message.author.nickname)}
                    color={isOwn ? "blue" : "gray"}
                    width={12}
                    height={12}
                />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-white">
                        {message.author.nickname}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(message.createdAt), "p")}
                    </div>
                </div>
                <div className={msg}>
                    <div>{message.content}</div>
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs text-gray-400">
                        Seen by {seenList}
                    </div>
                )}
            </div>
        </div>
    );
}
