"use client"

import {FullConversationType} from "@/types";
import {useEffect, useMemo, useState} from "react";
import useConversation from "@/hooks/useConversation";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {MdOutlineGroupAdd} from "react-icons/md";
import ConversationBox from "@/components/conversations/conversation-box";
import {User} from "@prisma/client";
import GroupChatModal from "@/components/conversations/group-chat-modal";
import {useSession} from "next-auth/react";
import {pusherClient} from "@/lib/pusher";
import {find} from "lodash";

interface ConversationList{
    initialItems: FullConversationType[]
    users:User[]
}
const ConversationList = ({initialItems,users}:ConversationList) => {
    const [items,setItems] = useState(initialItems)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const {conversationId,isOpen} = useConversation()
    const router = useRouter()
    const session = useSession();
    const publicKey = useMemo(() => {
        return session?.data?.user?.email
    },[session?.data?.user?.email])
    useEffect(() => {
        if(!publicKey){
            return
        }
        pusherClient.subscribe(publicKey)
        const newHandler = (conversation:FullConversationType) => {
            setItems((current) => {
                if (find(current,{id:conversationId})){
                    return current
                }
                return [conversation,...current]
            })
        }
        const updateHandler = (conversation:FullConversationType) =>{
            setItems((current) => current.map((currentConversation) => {
                if(currentConversation.id === conversation.id){
                    return {
                        ...currentConversation,
                        messages:conversation.messages
                    }
                }
                return currentConversation
            }))
        }
        const removeHandler = (conversation:FullConversationType) => {
            setItems((current) => {
                return[...current.filter((convo) => convo.id !== conversation.id)]
            })
            if (conversationId === conversation.id){
                router.push("/conversations")
            }
        }

        pusherClient.bind('conversation:new',newHandler)
        pusherClient.bind('conversation:update',updateHandler)
        pusherClient.bind('conversation:remove',removeHandler)

        return () => {
            pusherClient.unsubscribe(publicKey)
            pusherClient.unbind('conversation:new',newHandler)
            pusherClient.unbind('conversation:update',updateHandler)
            pusherClient.unbind('conversation:remove',removeHandler)
        }
    }, [publicKey,conversationId,router]);
    return(
        <>
            <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            <aside
                className={cn(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block  overflow-y-auto border-r border-gray-200`,
                    isOpen ? 'hidden' : "block w-full left-0")}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div onClick={() => setIsModalOpen(true)} className="rounded-full p-2 bg-gray-100 text-gray-600 hover:opacity-75 transition">
                            <MdOutlineGroupAdd size={20}/>
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox data={item} key={item.id} selected={conversationId === item.id}/>
                    ))}
                </div>
            </aside>
        </>
    )
}

export default ConversationList