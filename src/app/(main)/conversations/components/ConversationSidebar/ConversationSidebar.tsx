import getConversations from "@/actions/getConversations";
import ConversationList from "./ConversationList";
import CreateGroupButton from "./CreateGroupButton";

export default async function ConversationSidebar() {
    const conversations = await getConversations();

    return (
        <div className="flex h-screen w-screen flex-col px-6 py-6 text-white md:min-w-[350px] md:max-w-[350px]">
            <div className="flex items-center justify-between">
                <h1 className="my-4 text-3xl font-semibold">Chats</h1>
                <CreateGroupButton />
            </div>
            <ConversationList conversations={conversations} />
        </div>
    );
}
