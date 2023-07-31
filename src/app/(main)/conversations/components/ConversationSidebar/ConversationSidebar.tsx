"use client";

import { usePathname } from "next/navigation";
import ConversationList from "./ConversationList";
import CreateGroupButton from "./CreateGroupButton";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import clsx from "clsx";

export default function ConversationSidebar({
    currentUser,
    conversations,
}: {
    currentUser: FullUserType;
    conversations: FullConversationType[];
}) {
    const pathname = usePathname();

    return (
        <div
            className={clsx(
                "mx-6 h-screen w-screen flex-col pb-3 pt-6 text-white lg:mx-0 lg:min-w-[350px] lg:max-w-[350px]",
                pathname?.includes("/conversations/")
                    ? "hidden lg:flex"
                    : "lg:flex"
            )}
        >
            <div className="flex items-center justify-between">
                <h1 className="my-4 text-3xl font-semibold">Chats</h1>
                <CreateGroupButton currentUser={currentUser} />
            </div>
            <ConversationList
                currentUser={currentUser}
                conversations={conversations}
            />
        </div>
    );
}
