"use client";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import getInitials from "@/utils/getInitials";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function UserInfo({ user }: { user: User }) {
    return (
        <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar
                            initials={getInitials(user.nickname)}
                            height={9}
                            width={9}
                            color="purple"
                            status="online"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuLabel>{user.nickname}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-green-500 md:h-3 md:w-3"></span>
                                            Online
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-yellow-500 md:h-3 md:w-3"></span>
                                            Idle
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-red-500 md:h-3 md:w-3"></span>
                                            Busy
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
