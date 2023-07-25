"use client";

import Avatar from "@/components/Avatar";
import GroupAvatar from "@/components/GroupAvatar";
import useActiveList from "@/hooks/useActiveList";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import getInitials from "@/utils/getInitials";
import { useMemo } from "react";

export default function Header({
    currentUser,
    conversation,
}: {
    currentUser: FullUserType;
    conversation: FullConversationType;
}) {
    const otherUser = useMemo(() => {
        return conversation.users.filter(
            (user) => user.nickname != currentUser.nickname
        )[0];
    }, [conversation.users, currentUser.nickname]);
    const { members } = useActiveList();

    return (
        <div className="flex items-center gap-3 py-8">
            {conversation.isGroup ? (
                <GroupAvatar users={conversation.users} />
            ) : (
                <Avatar
                    initials={getInitials(otherUser.nickname)}
                    width={10}
                    height={10}
                    color="gray"
                    status={
                        members.includes(otherUser.id) ? "online" : undefined
                    }
                />
            )}
            <div>
                <p className="font-semibold text-white">
                    {conversation.isGroup
                        ? conversation.name
                        : otherUser.nickname}
                </p>
                <p className="text-[#737f8f]">
                    {conversation.isGroup
                        ? `${conversation.userIds.length} members, ${
                              conversation.userIds.filter(
                                  (id) => members.indexOf(id) !== -1
                              ).length
                          } online`
                        : members.includes(otherUser.id)
                        ? "Online"
                        : "Offline"}
                </p>
            </div>
        </div>
    );
}
