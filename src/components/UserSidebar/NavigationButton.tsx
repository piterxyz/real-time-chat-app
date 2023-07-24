"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavigationButton({
    title,
    path,
    icon,
}: {
    title: string;
    path: string;
    icon: React.ReactElement;
}) {
    const pathname = usePathname();

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        className={clsx(
                            "flex items-center gap-3",
                            pathname.includes(path)
                                ? "border-l-[3px] border-[#1d9aff] px-[26.5px] text-[#1d9aff] shadow-[inset_7px_0_2px_-7px_#1d9aff]"
                                : "px-[29.5px] text-[#757889] hover:border-l-[3px] hover:border-[#1d9aff]/70 hover:px-[26.5px] hover:text-[#1d9aff]/70"
                        )}
                        href={path}
                    >
                        <div className="">{icon}</div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>{title}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
