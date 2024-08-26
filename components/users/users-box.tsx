"use client"

import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import Avatar from "@/components/avatar";
import LoadingModal from "@/components/loadingModal";

interface UsersBoxProps{
    data:User
}
const UsersBox = ({data}:UsersBoxProps) => {
    const router = useRouter()
    const[loading,setLoading] = useState(false)
    const handleClick = useCallback(() =>{
        setLoading(true)
        axios.post("/api/conversations",{
            userId:data.id
        }).then((datas) =>{
            router.push(`/conversations/${datas.data.id}`)
        }).finally(() => setLoading(false))
    },[data,router])
    return (
        <>
            {loading && (
               <LoadingModal/>
            )}
            <div onClick={handleClick} className="relative w-full flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100
        rounded-lg transition cursor-pointer">
                <Avatar user={data}/>
                <div className="min-w-0 flex">
                    <div className="focus:outline-none">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-950">{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UsersBox