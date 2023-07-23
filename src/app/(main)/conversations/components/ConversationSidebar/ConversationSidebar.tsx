import getConversations from "@/actions/getConversations";
import ConversationList from "./ConversationList";
import CreateGroupButton from "./CreateGroupButton";

export default async function ConversationSidebar() {
    const conversations = await getConversations();

    return (
        <div className="flex h-screen w-screen flex-col px-6 py-6 md:min-w-[300px] md:max-w-[300px]">
            <div className="flex items-center justify-between">
                <h1 className="my-4 text-xl font-semibold">Messages</h1>
                <CreateGroupButton />
            </div>
            <ConversationList conversations={conversations} />
        </div>
    );
}
