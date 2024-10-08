"use client"

import {FullMessageType} from "@/types";
import {useSession} from "next-auth/react";
import {cn} from "@/lib/utils";
import Avatar from "@/components/avatar";
import {format} from "date-fns";
import Image from "next/image";
import {useState} from "react";
import ImageModal from "@/components/conversations/image-modal";

interface MessageBoxProps{
    data:FullMessageType,
    isLast?:boolean
}
const MessageBox = ({data,isLast}:MessageBoxProps) => {
    const session = useSession();
    const [imageModalOpen,setImageModalOpen] = useState(false)
    const isOwn = session?.data?.user?.email === data?.sender?.email
    const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name).join(", ");
    const container = cn("flex gap-3 p-4",isOwn && "justify-end")
    const avatar = cn(isOwn && "order-2")
    const body = cn("flex flex-col gap-2",isOwn && "items-end")
    const message = cn("text-sm w-fit overflow-hidden",isOwn ? "bg-sky-500 text-white" :"bg-gray-100",
        data.Image ? "rounded-md p-0" : "rounded-full px-2 py-3")
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender}/>
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt),"p")}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal onClose={() => setImageModalOpen(false)} isOpen={imageModalOpen} src={data.Image}/>
                    {data.Image ? (
                        <Image src={data.Image} alt={"Image"} height={288} width={288}  onClick={() => setImageModalOpen(true)}
                               className="object-cover cursor-pointer hover:scale-110 transition"/>
                    ) : (<div>{data.body}</div>)}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-400">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox