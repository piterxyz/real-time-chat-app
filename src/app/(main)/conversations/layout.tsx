import ConversationSidebar from "./components/ConversationSidebar/ConversationSidebar";

export default async function ConvLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ConversationSidebar />
            {children}
        </>
    );
}
