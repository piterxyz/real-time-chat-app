"use client";

import Avatar from "@/components/Avatar";
import GroupAvatar from "@/components/GroupAvatar";
import useActiveList from "@/hooks/useActiveList";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import getInitials from "@/utils/getInitials";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    return (
        <div className="flex items-center gap-3 pb-3 pt-8">
            <div className="flex items-center gap-3">
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#343744] text-white lg:hidden"
                    onClick={() => router.push("/conversations")}
                >
                    <ChevronLeft />
                </button>
                {conversation.isGroup ? (
                    <GroupAvatar users={conversation.users} />
                ) : (
                    <Avatar
                        initials={getInitials(otherUser.nickname)}
                        width={12}
                        height={12}
                        color="gray"
                        status={
                            members.includes(otherUser.id)
                                ? "online"
                                : undefined
                        }
                    />
                )}
            </div>
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
