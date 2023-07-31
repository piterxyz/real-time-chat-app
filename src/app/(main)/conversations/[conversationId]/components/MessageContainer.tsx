"use client";

import { FullMessageType } from "@/types/full-prisma";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/libs/pusherClient";
import markAsSeen from "@/actions/markAsSeen";
import monthNames from "@/utils/monthNames";

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

    const groupedMessages = {};
    items.forEach((message) => {
        const date = new Date(message.createdAt);
        const formattedDate = `${
            monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;

        if (!groupedMessages[formattedDate]) {
            groupedMessages[formattedDate] = [];
        }

        groupedMessages[formattedDate].push(message);
    });

    return (
        <div ref={bottomRef} className="my-3 flex-1 overflow-y-auto">
            {Object.entries(groupedMessages).map(([date, messages]) => (
                <div className="flex flex-col" key={date}>
                    <div className="mt-3 flex items-center text-[#a9aeba]">
                        <div className="ml-6 flex-grow border-t border-[#a9aeba]"></div>
                        <p className="mx-4 text-sm font-medium">{date}</p>
                        <div className="mr-6 flex-grow border-t border-[#a9aeba]"></div>
                    </div>
                    {messages.map((message, i) => (
                        <Message
                            key={message.id}
                            message={message}
                            isLast={i === messages.length - 1}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
