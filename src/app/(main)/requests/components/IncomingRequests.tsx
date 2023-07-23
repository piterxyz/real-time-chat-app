"use client";

import DeleteFriendRequestButton from "./DeleteFriendRequestButton";
import Avatar from "@/components/Avatar";
import getInitials from "@/utils/getInitials";
import { FullFriendRequestType, FullUserType } from "@/types/full-prisma";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusherClient";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";

export default function IncomingRequests({
    currentUser,
    requests,
}: {
    currentUser: FullUserType;
    requests: FullFriendRequestType[];
}) {
    const [items, setItems] = useState(requests);

    useEffect(() => {
        pusherClient.subscribe(currentUser.id);

        const newHandler = (friendRequest: FullFriendRequestType) => {
            if (friendRequest.senderId == currentUser.id) return;

            setItems((current) => {
                return [friendRequest, ...current];
            });
        };

        const deleteHandler = (friendRequest: FullFriendRequestType) => {
            if (friendRequest.senderId == currentUser.id) return;

            setItems((current) => {
                return [
                    ...current.filter((convo) => convo.id !== friendRequest.id),
                ];
            });
        };

        pusherClient.bind("friendRequest:new", newHandler);
        pusherClient.bind("friendRequest:delete", deleteHandler);

        return () => {
            pusherClient.unsubscribe(currentUser.id);
            pusherClient.unbind("friendRequest:new", newHandler);
            pusherClient.unbind("friendRequest:delete", deleteHandler);
        };
    });

    return (
        <div className="flex flex-col overflow-y-auto">
            {items.length ? (
                <ul className="my-4 flex flex-col gap-1.5">
                    {items.map((value) => (
                        <li
                            key={value.senderId}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Avatar
                                    initials={getInitials(
                                        value.sender.nickname
                                    )}
                                    width={8}
                                    height={8}
                                    color="gray"
                                />
                                <span>{value.sender.nickname}</span>
                            </div>
                            <div className="flex gap-1">
                                <AcceptFriendRequestButton
                                    senderId={value.senderId}
                                    receiverId={value.receiverId}
                                />
                                <DeleteFriendRequestButton
                                    senderId={value.senderId}
                                    receiverId={value.receiverId}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="my-4 text-sm">
                    You don&apos;t have any incoming friend requests.
                </p>
            )}
        </div>
    );
}
