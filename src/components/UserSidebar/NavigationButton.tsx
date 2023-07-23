"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <Link
            className={clsx(
                "flex items-center gap-2 rounded-md p-1.5 duration-200",
                pathname.includes(path)
                    ? "bg-[#f5f5f4] dark:bg-[#4b4b4a]"
                    : "hover:bg-[#f5f5f4]/50 dark:hover:bg-[#4b4b4a]/50"
            )}
            href={path}
        >
            <div className="rounded-md bg-[#ebebeb] p-2 text-black dark:bg-[#6d6d6d] dark:text-white">
                {icon}
            </div>
            {title}
        </Link>
    );
}
