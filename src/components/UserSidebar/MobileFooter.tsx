"use client";

import { FullUserType } from "@/types/full-prisma";
import MobileNavigationButton from "./MobileNavigationButton";
import MobileFriendRequestNavigation from "./MobileFriendRequestNavigation";
import { MessageSquare } from "lucide-react";
import UserInfo from "./UserInfo";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MobileFooter({ user }: { user: FullUserType }) {
    const pathname = usePathname();

    return (
        <div
            className={clsx(
                "fixed bottom-5 right-0 z-40 mx-auto w-full lg:hidden",
                pathname?.includes("/conversations/") ? "hidden" : "block"
            )}
        >
            <div className="mx-6 flex items-center justify-around rounded-full bg-[#323644]">
                <MobileNavigationButton
                    title="Conversations"
                    path="/conversations"
                    icon={<MessageSquare />}
                />
                <MobileFriendRequestNavigation
                    userId={user.id}
                    incomingRequestsLength={user?.incomingFriendRequests.length}
                />
                <UserInfo user={user as FullUserType} />
            </div>
        </div>
    );
}
