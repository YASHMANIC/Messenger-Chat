"use client"

import useRoutes from "@/hooks/useRoutes";
import useConversation from "@/hooks/useConversation";
import MobileItem from "@/components/sidebar/mobile-item";

const MobileFooter = () => {
    const routes = useRoutes()
    const {isOpen} = useConversation()
    if(isOpen){
        return null
    }
    return(
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white lg:hidden border-t-[1px]">
            {routes.map((route) => (
                <MobileItem key={route.href} href={route.href} label={route.href} icon={route.icon} active={route.active} onClick={route.onClick}/>
            ))}
        </div>
    )

}

export default MobileFooter