"use client"
import useRoutes from "@/hooks/useRoutes";
import DesktopItems from "@/components/sidebar/desktop-items";
import {User} from "@prisma/client";
import {useState} from "react";
import Avatar from "@/components/avatar";
import SettingsModal from "@/components/sidebar/settings-modal";

interface DesktopSidebarProps {
    currentUser:User
}

const DesktopSidebar = ({currentUser}:DesktopSidebarProps) => {
    const routes = useRoutes()
    const [isOpen,setIsOpen] = useState(false)
    return(
        <>
            <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() =>setIsOpen(false)}/>
            <div className="hidden lg:fixed lg:left-0 lg:inset-y-0 lg:z-40 lg:w-20 xl:px-6
         lg:overflow-y-auto lg:bg-white lg:pb-4 lg:flex lg:border-r-[1px] lg:flex-col justify-between"
            >
                <nav className="mt-4 flex flex-col justify-between">
                    <ul role="list" className="flex flex-col items-center space-y-3">
                        {routes.map((item) => (
                            <DesktopItems key={item.label} label={item.label} href={item.href} icon={item.icon}
                                          onClick={item.onClick} active={item.active}/>
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col items-center justify-between">
                    <div className="cursor-pointer hover:opacity-75 transition" onClick={() => setIsOpen(true)}>
                        <Avatar user={currentUser}/>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default DesktopSidebar