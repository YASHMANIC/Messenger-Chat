import {ChatBubbleIcon} from "@radix-ui/react-icons";
import {usePathname} from "next/navigation";
import useConversation from "@/hooks/useConversation";
import {useMemo} from "react";
import {HiArrowLeftEndOnRectangle, HiUser} from "react-icons/hi2";
import {signOut} from "next-auth/react";


const useRoutes = () => {
        const pathname = usePathname()
    const {conversationId} = useConversation()
       const routes = useMemo(() => [
           {
        label:"Chats",
        icon: ChatBubbleIcon,
        href:"/conversations",
        active: pathname === '/conversations' || !!conversationId
    },
    {
        label:"Users",
        icon: HiUser,
        href:"/users",
        active: pathname === '/users'
    },{
        label:"Logout",
        icon: HiArrowLeftEndOnRectangle,
        href:"/",
        onClick: () => signOut()
    }
       ],[pathname,conversationId])
    return routes;
}
export default useRoutes