import getConversationById from "@/actions/getConversationById";
import Header from "./components/Header";
import getCurrentUser from "@/actions/getCurrentUser";
import Body from "./components/Body";

export default async function Page({
    params,
}: {
    params: { conversationId: string };
}) {
    const conversation = await getConversationById(params.conversationId);
    const currentUser = await getCurrentUser();

    if (!conversation)
        return (
            <div className="flex flex-1 items-center justify-center text-xl font-semibold text-white">
                Conversation not found
            </div>
        );

    return (
        <div className="flex h-screen flex-1 flex-col px-6">
            <Header currentUser={currentUser} conversation={conversation} />
            <Body conversation={conversation} />
        </div>
    );
}
