import DesktopSidebar from "@/components/sidebar/desktop-sidebar";
import MobileFooter from "@/components/sidebar/mobile-footer";
import getCurrentUser from "@/actions/useCurrentUser";

const Sidebar = async ({children}:{children:React.ReactNode}) => {
    const currentUser = await getCurrentUser();
    return(
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!}/>
             <MobileFooter/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}
export default Sidebar