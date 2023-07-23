import ConversationCard from "./ConversationCard";
import { FullConversationType } from "@/types/full-prisma";

export default function ConversationList({
    conversations,
}: {
    conversations: FullConversationType[];
}) {
    return (
        <div>
            {conversations.map((value) => (
                <ConversationCard key={value.id} conversation={value} />
            ))}
        </div>
    );
}
