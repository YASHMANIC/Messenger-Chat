"use client"

import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "sonner";
import Modal from "@/components/Modal";
import SetInput from "@/components/ui/SetInput";
import SelectMembers from "@/components/conversations/select-members";
import {Button} from "@/components/ui/button";

interface GroupChatModalProps{
    isOpen?:boolean,
    onClose:()=>void,
    users:User[]
}

const GroupChatModal = ({isOpen, users, onClose}:GroupChatModalProps) => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const {register,setValue,watch,
    handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]
        }
    })
    const members = watch('members')
    const onSubmit :SubmitHandler<FieldValues> = (data) =>{
        setLoading(true)
        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        }).then(() =>{
            router.refresh();
            onClose();
            toast.success("Group Created Successfully",{
                duration:3000,
                position:"top-center"
            })
        }).catch(() => toast.error("SomeThing Went Wrong",{
            duration:3000,
            position:"top-center"
        })).finally(() => setLoading(false))
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base leading-6 font-semibold text-gray-900">
                            Create A Group Chat
                        </h2>
                        <p className="mt-1 text-gray-500 text-sm leading-6">
                            Create A Group Chat With More Than 2 People
                        </p>
                        <div className="mt-6 flex flex-col gap-y-6">
                            <SetInput label={"Name"} id={"name"} register={register} errors={errors} required disabled={loading}/>
                            <SelectMembers disabled={loading}
                                    label="Members"
                                    options={users.map((user) =>({
                                        label:user.name,
                                        value:user.id,
                                    }))}
                                    onChange={(value) => setValue('members',value,{
                                        shouldValidate:true
                                    })}
                                    value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button variant="outline" size={"lg"} disabled={loading} onClick={onClose}>Cancel</Button>
                    <Button variant="default" size={"lg"} disabled={loading} type={"submit"}>Create</Button>
                </div>
            </form>
        </Modal>
    )
}
export default GroupChatModal
