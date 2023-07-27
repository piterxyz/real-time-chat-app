import getCurrentUser from "@/actions/getCurrentUser";
import UserInfo from "./UserInfo";
import { User } from "@prisma/client";
import NavigationContainer from "./NavigationContainer";
import NavigationButton from "./NavigationButton";
import { MessageSquare } from "lucide-react";
import FriendRequestNavigation from "./FriendRequestNavigation";

export default async function UserSidebar() {
    const user = await getCurrentUser();

    return (
        <div className="flex h-screen flex-col py-10">
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
            <UserInfo user={user as User} />
        </div>
    );
}
