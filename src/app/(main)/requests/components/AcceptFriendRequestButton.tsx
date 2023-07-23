"use client";

import createConversation from "@/actions/createConversation";
import deleteFriendRequest from "@/actions/deleteFriendRequest";
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
        createConversation(senderId).then(() =>
            deleteFriendRequest(senderId, receiverId)
        );
    };

    return (
        <Button variant="outline" size="icon" onClick={() => handleAccept()}>
            <Check size={20} />
        </Button>
    );
}
