"use client";

import Avatar from "@/components/Avatar";
import GroupAvatar from "@/components/GroupAvatar";
import useActiveList from "@/hooks/useActiveList";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import getInitials from "@/utils/getInitials";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

export default function ConversationCard({
    currentUser,
    conversation,
}: {
    currentUser: FullUserType;
    conversation: FullConversationType;
}) {
    const { members } = useActiveList();

    const otherUser = useMemo(() => {
        return conversation.users.filter(
            (user) => user.nickname != currentUser.nickname
        )[0];
    }, [conversation.users, currentUser.nickname]);

    const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];

        return messages[messages.length - 1];
    }, [conversation.messages]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        return (
            seenArray.filter((user) => user.nickname == currentUser.nickname)
                .length !== 0
        );
    }, [currentUser.nickname, lastMessage]);

    const lastMessageText = useMemo(() => {
        console.log(lastMessage);

        if (conversation.isGroup && lastMessage?.content) {
            return (
                <p>
                    <span className="text-white">
                        {lastMessage?.author?.nickname}
                    </span>{" "}
                    {lastMessage?.content}
                </p>
            );
        }

        if (lastMessage?.content) {
            return lastMessage.content;
        }

        return "Started a conversation.";
    }, [lastMessage, conversation.isGroup]);

    return (
        <Link
            href={`/conversations/${conversation.id}`}
            className="flex items-center justify-between rounded-2xl bg-[#323644] px-5 py-4 shadow-md"
        >
            <div className="flex flex-1 items-center justify-center gap-3 truncate leading-6">
                {conversation.isGroup ? (
                    <GroupAvatar users={conversation.users} />
                ) : (
                    <Avatar
                        initials={getInitials(otherUser.nickname)}
                        width={10}
                        height={10}
                        color="gray"
                        status={
                            members.includes(otherUser.id)
                                ? "online"
                                : undefined
                        }
                    />
                )}
                <div className="flex flex-1 flex-col items-start truncate">
                    <p className="truncate font-semibold">
                        {conversation.isGroup
                            ? conversation.name
                            : otherUser.nickname}
                    </p>
                    <span className="w-full truncate text-sm text-[#737f8f]">
                        {lastMessageText}
                    </span>
                </div>
            </div>
            {!hasSeen && (
                <span className="ml-4 h-3 w-3 rounded-full bg-[#19a0ff] shadow shadow-[#19a0ff]"></span>
            )}
        </Link>
    );
}
