import Avatar from "@/components/Avatar";
import { FullConversationType, FullUserType } from "@/types/full-prisma";
import getInitials from "@/utils/getInitials";
import Link from "next/link";

export default function ConversationCard({
    currentUser,
    conversation,
}: {
    currentUser: FullUserType;
    conversation: FullConversationType;
}) {
    return (
        <Link
            href={`/conversations/${conversation.id}`}
            className="flex items-center justify-between rounded-2xl bg-[#323644] px-5 py-4 shadow-md"
        >
            <div className="flex items-center justify-center gap-3 leading-6">
                <Avatar
                    initials={getInitials(
                        conversation.users.filter(
                            (user) => user.nickname != currentUser.nickname
                        )[0].nickname
                    )}
                    width={10}
                    height={10}
                    color="gray"
                    status="online"
                />
                <div className="flex flex-col justify-center truncate">
                    <p>
                        {conversation.isGroup
                            ? conversation.name
                            : conversation.users.filter(
                                  (user) =>
                                      user.nickname != currentUser.nickname
                              )[0].nickname}
                    </p>
                    <span className="w-[180px] truncate text-sm text-[#737f8f]">
                        Miło Cię Poznać. Przykro mi. Niestseto
                    </span>
                </div>
            </div>
            <span className="ml-4 h-3 w-3 rounded-full bg-[#19a0ff] shadow-sm shadow-[#19a0ff]"></span>
        </Link>
    );
}
