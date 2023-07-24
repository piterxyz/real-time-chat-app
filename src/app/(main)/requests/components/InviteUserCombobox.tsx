"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Avatar from "@/components/Avatar";
import getInitials from "@/utils/getInitials";
import createFriendRequest from "@/actions/createFriendRequest";
import { toast } from "react-toastify";
import { FullUserType } from "@/types/full-prisma";
import { pusherServer } from "@/libs/pusherServer";

export default function InviteUserCombobox({
    currentUser,
    users,
}: {
    currentUser: FullUserType;
    users: FullUserType[];
}) {
    const [open, setOpen] = React.useState(false);

    const handleInvite = (receiverId: string) => {
        createFriendRequest(currentUser.id, receiverId).catch((error) => {
            toast.error(error.message);
            console.error(error);
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    Invite users...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Invite users..." />
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                        {users
                            .filter(
                                (user) =>
                                    (!currentUser.outgoingFriendRequests
                                        .map((value) => value.receiverId)
                                        .includes(user.id) ||
                                        !currentUser.incomingFriendRequests
                                            .map((value) => value.senderId)
                                            .includes(user.id)) &&
                                    !currentUser.friendOfdIds.includes(user.id)
                            )
                            .map((user) => (
                                <CommandItem
                                    key={user.id}
                                    onSelect={(currentValue) =>
                                        handleInvite(user.id)
                                    }
                                >
                                    <Avatar
                                        initials={getInitials(user.nickname)}
                                        width={6}
                                        height={6}
                                        color="gray"
                                        className="mr-2 text-xs"
                                    />
                                    {user.nickname}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
