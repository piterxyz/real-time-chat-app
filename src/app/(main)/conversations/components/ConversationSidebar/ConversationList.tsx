import getCurrentUser from "@/actions/getCurrentUser";
import ConversationCard from "./ConversationCard";
import { FullConversationType } from "@/types/full-prisma";

export default async function ConversationList({
    conversations,
}: {
    conversations: FullConversationType[];
}) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex flex-col gap-3">
            {conversations.map((value) => (
                <ConversationCard
                    key={value.id}
                    currentUser={currentUser}
                    conversation={value}
                />
            ))}
        </div>
    );
}
