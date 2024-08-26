"use client"

import useConversation from "@/hooks/useConversation";
import Emptystate from "@/components/emptystate";
import {cn} from "@/lib/utils";

const Home = () => {
    const {isOpen} = useConversation()
    return(
        <div className={cn("lg:pl-80 lg:block h-full",isOpen?'block' : 'hidden')}>
            <Emptystate/>
        </div>
    )
}
export default Home