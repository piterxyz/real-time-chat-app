"use client";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import getInitials from "@/utils/getInitials";
import { LogOut } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";

export default function UserInfo({ user }: { user: User }) {
    return (
        <div className="flex items-center justify-between p-1.5">
            <div className="flex items-center gap-2">
                <Avatar
                    initials={getInitials(user.nickname)}
                    height={10}
                    width={10}
                    color="purple"
                />
                <p>{user.nickname}</p>
            </div>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            className="duration-200 hover:text-red-500"
                            onClick={() => signOut()}
                        >
                            <LogOut size={24} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Logout</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
