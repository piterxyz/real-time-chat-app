"use client";

import { useEffect, useState } from "react";
import ConversationCard from "./ConversationCard";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import { pusherClient } from "@/libs/pusherClient";

export default function ConversationList({
    currentUser,
    conversations,
}: {
    currentUser: FullUserType;
    conversations: FullConversationType[];
}) {
    const [items, setItems] = useState(conversations);

    useEffect(() => {
        pusherClient.subscribe(currentUser.id);

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        };
                    }

                    return currentConversation;
                })
            );
        };

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [conversation, ...current];
            });
        };

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [
                    ...current.filter((convo) => convo.id !== conversation.id),
                ];
            });
        };

        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:remove", removeHandler);
    }, [currentUser.id]);

    return (
        <div className="flex flex-col gap-3 overflow-y-auto">
            {items.map((value) => (
                <ConversationCard
                    key={value.id}
                    currentUser={currentUser}
                    conversation={value}
                />
            ))}
        </div>
    );
}
