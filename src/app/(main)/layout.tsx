import UserSidebar from "@/components/UserSidebar/UserSidebar";

export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <UserSidebar />
            {children}
        </div>
    );
}
