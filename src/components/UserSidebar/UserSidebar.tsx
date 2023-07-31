import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "./DekstopSidebar";
import MobileFooter from "./MobileFooter";

export default async function UserSidebar() {
    const user = await getCurrentUser();

    return (
        <div>
            <DesktopSidebar user={user} />
            <MobileFooter user={user} />
        </div>
    );
}
