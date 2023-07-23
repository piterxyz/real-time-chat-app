import { Conversation } from "@prisma/client";
import Link from "next/link";

export default function ConversationCard({
    conversation,
}: {
    conversation: Conversation;
}) {
    return (
        <Link href={`/conversations/${conversation.id}`}>
            {conversation.id}
        </Link>
    );
}
