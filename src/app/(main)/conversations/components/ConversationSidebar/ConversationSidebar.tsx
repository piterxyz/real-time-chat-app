import getConversations from "@/actions/getConversations";
import ConversationList from "./ConversationList";
import CreateGroupButton from "./CreateGroupButton";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function ConversationSidebar() {
    const conversations = await getConversations();
    const currentUser = await getCurrentUser();

    return (
        <div className="flex h-screen w-screen flex-col px-6 py-6 text-white md:min-w-[350px] md:max-w-[350px]">
            <div className="flex items-center justify-between">
                <h1 className="my-4 text-3xl font-semibold">Chats</h1>
                <CreateGroupButton currentUser={currentUser} />
            </div>
            <ConversationList conversations={conversations} />
        </div>
    );
}
