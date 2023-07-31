"use client";

import { pusherClient } from "@/libs/pusherClient";
import { FullFriendRequestType } from "@/types/full-prisma";
import clsx from "clsx";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MobileFriendRequestNavigation({
    userId,
    incomingRequestsLength,
}: {
    userId: string;
    incomingRequestsLength: number;
}) {
    const [length, setLength] = useState(incomingRequestsLength);
    const pathname = usePathname();

    useEffect(() => {
        pusherClient.subscribe(userId);

        const newHandler = (friendRequest: FullFriendRequestType) => {
            if (friendRequest.senderId == userId) return;

            setLength(length + 1);
        };

        const deleteHandler = (friendRequest: FullFriendRequestType) => {
            if (friendRequest.senderId == userId) return;

            setLength(length - 1);
        };

        pusherClient.bind("friendRequest:new", newHandler);
        pusherClient.bind("friendRequest:delete", deleteHandler);

        return () => {
            pusherClient.unsubscribe(userId);
            pusherClient.unbind("friendRequest:new", newHandler);
            pusherClient.unbind("friendRequest:delete", deleteHandler);
        };
    });

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        className={clsx(
                            "relative flex items-center justify-between gap-2",
                            pathname?.includes("/requests")
                                ? "border-b-[3px] border-[#1d9aff] py-[26.5px] text-[#1d9aff]"
                                : "py-[29.5px] text-[#757889] hover:border-b-[3px] hover:border-[#1d9aff]/70 hover:py-[28px] hover:text-[#1d9aff]/70"
                        )}
                        href="/requests"
                    >
                        <div className="flex items-center gap-2">
                            <UserPlus />
                            {length > 0 && (
                                <p className="absolute left-3 top-4 mr-2 flex h-3 w-3 items-center justify-center rounded-full bg-red-400 p-2 text-xs text-white">
                                    {length}
                                </p>
                            )}
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>Friend requests</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
