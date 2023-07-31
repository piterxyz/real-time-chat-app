import getConversations from "@/actions/getConversations";
import ConversationSidebar from "./components/ConversationSidebar/ConversationSidebar";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function ConvLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const conversations = await getConversations();
    const currentUser = await getCurrentUser();

    return (
        <>
            <ConversationSidebar
                conversations={conversations}
                currentUser={currentUser}
            />
            {children}
        </>
    );
}
