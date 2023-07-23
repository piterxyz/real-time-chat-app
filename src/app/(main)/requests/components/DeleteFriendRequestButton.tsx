"use client";

import deleteFriendRequest from "@/actions/deleteFriendRequest";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function DeleteFriendRequestButton({
    senderId,
    receiverId,
}: {
    senderId: string;
    receiverId: string;
}) {
    const handleDelete = () => {
        deleteFriendRequest(senderId, receiverId);
    };

    return (
        <Button variant="outline" size="icon" onClick={() => handleDelete()}>
            <X size={20} />
        </Button>
    );
}
