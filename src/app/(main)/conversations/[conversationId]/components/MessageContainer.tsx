"use client";

import { FullMessageType } from "@/types/full-prisma";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/libs/pusherClient";
import markAsSeen from "@/actions/markAsSeen";

export default function MessageContainer({
    messages,
    conversationId,
}: {
    messages: FullMessageType[];
    conversationId: string;
}) {
    const [items, setItems] = useState(messages);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message: FullMessageType) => {
            markAsSeen(conversationId);

            setItems((current) => {
                return [...current, message];
            });

            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setItems((current) =>
                current.map((currentMessage) => {
                    if (currentMessage.id === newMessage.id) {
                        return newMessage;
                    }

                    return currentMessage;
                })
            );
        };

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        };
    }, [conversationId]);

    return (
        <div ref={bottomRef} className="my-3 flex-1 overflow-y-auto">
            {items.map((message, i) => (
                <Message
                    key={message.id}
                    message={message}
                    isLast={i === messages.length - 1}
                />
            ))}
        </div>
    );
}
