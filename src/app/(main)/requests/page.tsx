import getUsers from "@/actions/getUsers";
import InviteUserCombobox from "./components/InviteUserCombobox";
import OutgoingRequests from "./components/OutgoingRequests";
import getCurrentUser from "@/actions/getCurrentUser";
import IncomingRequests from "./components/IncomingRequests";

export default async function RequestsPage() {
    const users = await getUsers();
    const currentUser = await getCurrentUser();

    return (
        <div className="flex h-screen max-w-screen-sm flex-1 flex-col px-6 py-6">
            <div className="my-4">
                <h2 className="text-xl font-semibold">Friend requests</h2>
            </div>
            <div className="flex h-1/2 flex-col">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Outgoing</h3>
                    <InviteUserCombobox
                        currentUser={currentUser}
                        users={users.filter(
                            (user) => user.id !== currentUser.id
                        )}
                    />
                </div>
                <OutgoingRequests
                    currentUser={currentUser}
                    requests={currentUser?.outgoingFriendRequests}
                />
            </div>
            <div className="flex h-1/2 flex-col">
                <h3 className="text-lg font-semibold">Incoming</h3>
                <IncomingRequests
                    currentUser={currentUser}
                    requests={currentUser?.incomingFriendRequests}
                />
            </div>
        </div>
    );
}
