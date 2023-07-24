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
        <div>
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
