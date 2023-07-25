import { FullUserType } from "@/types/full-prisma";
import Avatar from "./Avatar";
import getInitials from "@/utils/getInitials";

export default function GroupAvatar({
    users = [],
}: {
    users?: FullUserType[];
}) {
    const slicedUsers = users.slice(0, 3);

    const positionMap = {
        0: "top-0 left-[12px]",
        1: "bottom-0",
        2: "bottom-5 left-6",
    };

    return (
        <div className="relative h-10 w-10">
            {slicedUsers.map((user, index) => (
                <Avatar
                    key={user.id}
                    initials={getInitials(user.nickname)}
                    width={5}
                    height={5}
                    color="gray"
                    className={`absolute inline-block overflow-hidden rounded-full ${
                        positionMap[index as keyof typeof positionMap]
                    }`}
                />
            ))}
        </div>
    );
}
