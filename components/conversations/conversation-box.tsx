"use client"

import {FullConversationType} from "@/types";
import {Conversation,Message,User} from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import {cn} from "@/lib/utils";
import Avatar from "@/components/avatar";
import {format} from "date-fns";
import AvatarGroup from "@/components/avatarGroup";

interface ConversationBoxProps {
    data:FullConversationType
    selected?:boolean
}

const ConversationBox = ({data,selected}:ConversationBoxProps) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    },[data.id,router])
    const lastMessage = useMemo(() =>{
        const messages = data.messages || []
        return messages[messages.length-1]
    },[data.messages])
    const userEmail = useMemo(()=>{
        return session?.data?.user?.email
    },[session?.data?.user?.email])
    const hasSeen = useMemo(()=>{
        if(!lastMessage){
            return[]
        }
        const seenArray = lastMessage.seen || [];
        if(!userEmail){
            return false
        }
        return seenArray.filter((user) => user.email === userEmail).length !== 0
    },[userEmail,lastMessage])
    const lastMessageText = useMemo(()=>{
        if(lastMessage?.Image){
            return "Sent an Image"
        }
        if(lastMessage?.body){
            return lastMessage.body
        }
        return "Started A Conversation"
    },[lastMessage])
    return (
        <div onClick={handleClick} className={cn(`relative p-4 flex w-full items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
            selected?'bg-neutral-100':'bg-white')}>
            {data.isGroup ? (
                <AvatarGroup users={data.users}/>
            ) : ( <Avatar user={otherUser}/>)}

            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                   <div className="flex justify-between items-center mb-1">
                       <p className="text-md font-medium text-gray-900">{data.name || otherUser.name}</p>
                       {lastMessage?.createdAt && (<p className="text-xs text-gray-400 font-light">{format(new Date(lastMessage.createdAt),'p')}</p>)}
                   </div>
                    <p className={cn(`truncate text-sm`,hasSeen ? "text-gray-500" :"text-black font-medium")}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox