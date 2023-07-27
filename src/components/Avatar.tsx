import clsx from "clsx";

const colors = {
    gray: "bg-[#343243]",
    blue: "bg-[#1d90f5]",
};

type Status = "online" | "idle" | "busy";

export default function Avatar({
    initials,
    width,
    height,
    color,
    className,
    status,
}: {
    initials: string;
    width: number;
    height: number;
    color: "gray" | "blue";
    className?: string;
    status?: Status;
}) {
    return (
        <div
            className={clsx(
                colors[color],
                `w-${width}`,
                `h-${height}`,
                "relative flex items-center justify-center rounded-full text-white",
                className
            )}
        >
            <p>{initials}</p>
            {status && (
                <span className="absolute right-0.5 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-[#272a37]" />
            )}
        </div>
    );
}
