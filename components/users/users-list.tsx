"use client"

import {User} from "@prisma/client";
import UsersBox from "@/components/users/users-box";


interface UserListProps{
    items:User[]
}

const UsersList = ({items}:UserListProps) =>{
    return (
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-neutral-800 py-4">Peoples</div>
                </div>
                {items.map((item)=>(
                  <UsersBox data={item} key={item.id}/>
                ))}
            </div>
        </aside>
    )
}
export default UsersList