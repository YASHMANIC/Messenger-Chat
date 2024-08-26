"use client"

import {Conversation, User} from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import Avatar from "@/components/avatar";
import ProfileDrawer from "@/components/profile-drawer";
import AvatarGroup from "@/components/avatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface HeaderProps{
    conversation:Conversation &{
        users:User[]
    }
}


const Header = ({conversation}:HeaderProps) => {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen,setDrawerOpen] = useState(false)
    const {members} = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1
    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return isActive ? 'Active' : 'Offline'
    },[conversation,isActive])
    return(
        <>
            <ProfileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} data={conversation}/>
            <div
                className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link href={"/conversations"}
                          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                        <HiChevronLeft size={25}/>
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users}/>
                        ) : (
                      <Avatar user={otherUser}/>
                    )}
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-normal text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal onClick={() => setDrawerOpen(true)} size={30} className="text-sky-500 hover:text-sky-600 cursor-pointer transition "/>
            </div>
        </>
    )
}

export default Header