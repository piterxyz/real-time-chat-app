import { MessageSquare } from "lucide-react";
import NavigationButton from "./NavigationButton";
import NavigationContainer from "./NavigationContainer";
import { FullUserType } from "@/types/full-prisma";
import UserInfo from "./UserInfo";
import FriendRequestNavigation from "./FriendRequestNavigation";

export default function DesktopSidebar({ user }: { user: FullUserType }) {
    return (
        <div className="hidden h-screen flex-col py-10 lg:flex">
            <NavigationContainer>
                <NavigationButton
                    title="Conversations"
                    path="/conversations"
                    icon={<MessageSquare />}
                />
                <FriendRequestNavigation
                    userId={user.id}
                    incomingRequestsLength={user?.incomingFriendRequests.length}
                />
            </NavigationContainer>
            <UserInfo user={user as FullUserType} />
        </div>
    );
}
