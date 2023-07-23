import clsx from "clsx";

const colors = {
    gray: "bg-[#343243]",
    purple: "bg-[#7754b2]",
};

export default function Avatar({
    initials,
    width,
    height,
    color,
    className,
}: {
    initials: string;
    width: number;
    height: number;
    color: "gray" | "purple";
    className?: string;
}) {
    return (
        <div
            className={clsx(
                colors[color],
                `w-${width}`,
                `h-${height}`,
                "flex items-center justify-center rounded-md text-white",
                className
            )}
        >
            {initials}
        </div>
    );
}
