"use client";

import markAsSeen from "@/actions/markAsSeen";
import { FullConversationType } from "@/types/full-prisma";
import { useEffect } from "react";
import Form from "./Form";
import MessageContainer from "./MessageContainer";

export default function Body({
    conversation,
}: {
    conversation: FullConversationType;
}) {
    useEffect(() => {
        markAsSeen(conversation.id);
    }, [conversation.id]);

    return (
        <div className="mb-4 flex w-full flex-1 flex-col overflow-y-auto rounded-xl bg-[#323644] px-3 py-3">
            <MessageContainer
                conversationId={conversation.id}
                messages={conversation.messages}
            />
            <Form conversationId={conversation.id} />
        </div>
    );
}
