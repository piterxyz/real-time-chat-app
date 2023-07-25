"use client";

import acceptFriendRequest from "@/actions/acceptFriendRequest";
import createConversation from "@/actions/createConversation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function AcceptFriendRequestButton({
    senderId,
    receiverId,
}: {
    senderId: string;
    receiverId: string;
}) {
    const handleAccept = () => {
        createConversation({
            userId: senderId,
        }).then(() => acceptFriendRequest(senderId, receiverId));
    };

    return (
        <Button variant="outline" size="icon" onClick={() => handleAccept()}>
            <Check size={20} />
        </Button>
    );
}
