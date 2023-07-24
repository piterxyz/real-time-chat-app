import getCurrentUser from "@/actions/getCurrentUser";
import UserInfo from "./UserInfo";
import { User } from "@prisma/client";
import NavigationContainer from "./NavigationContainer";
import NavigationButton from "./NavigationButton";
import { MessageSquare, Ban, Trash2, Archive, UserPlus } from "lucide-react";
import FriendRequestNavigation from "./FriendRequestNavigation";

export default async function UserSidebar() {
    const user = await getCurrentUser();

    return (
        <div className="flex flex-col py-10">
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
                <NavigationButton
                    title="Archive"
                    path="/archive"
                    icon={<Archive />}
                />
                <NavigationButton
                    title="Trash"
                    path="/trash"
                    icon={<Trash2 />}
                />
                <NavigationButton
                    title="Blocked"
                    path="/blocked"
                    icon={<Ban />}
                />
            </NavigationContainer>
            <UserInfo user={user as User} />
        </div>
    );
}
