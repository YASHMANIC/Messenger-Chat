"use client"

import Link from "next/link";
import {cn} from "@/lib/utils";

interface MobileItemProps{
    label:string
    href:string
    icon:any
    onClick?:() => void
    active?:boolean
}
const MobileItem = ({label,href,icon:Icon,onClick,active}:MobileItemProps) => {
     const handleClick = () => {
        if(onClick){
            return onClick()
        }
    }
    return (
            <Link href={href} onClick={handleClick}
                  className={cn(`group flex gap-x-3 leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-black')}>
                <Icon className="h-6 w-6 shrink-0"/>
                <span className="sr-only">{label}</span>
            </Link>
    )
}
export default MobileItem