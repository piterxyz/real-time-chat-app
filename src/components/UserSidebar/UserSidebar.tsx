import getCurrentUser from "@/actions/getCurrentUser";
import UserInfo from "./UserInfo";
import { User } from "@prisma/client";
import { ThemeSwitch } from "./ThemeSwitch";
import NavigationContainer from "./NavigationContainer";
import NavigationButton from "./NavigationButton";
import { MessageSquare, Ban, Trash2, Archive, UserPlus } from "lucide-react";

export default async function UserSidebar() {
    const user = await getCurrentUser();

    return (
        <div className="flex h-screen w-screen flex-col px-6 py-6 md:min-w-[300px] md:max-w-[300px]">
            <div className="flex items-center justify-between">
                <h1 className="my-4 text-xl font-semibold">
                    Real-time Chat App
                </h1>
                <ThemeSwitch />
            </div>
            <NavigationContainer>
                <NavigationButton
                    title="Conversations"
                    path="/conversations"
                    icon={<MessageSquare />}
                />
                <NavigationButton
                    title="Friend requests"
                    path="/requests"
                    icon={<UserPlus />}
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
