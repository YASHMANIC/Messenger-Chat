"use client"

import {useRouter} from "next/navigation";
import useConversation from "@/hooks/useConversation";
import {useCallback, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import Modal from "@/components/Modal";
import {FiAlertTriangle} from "react-icons/fi";
import {Dialog} from "@headlessui/react";
import {Button} from "@/components/ui/button";

interface ConfirmModalProps{
    isOpen?:boolean,
    onClose:() => void
}

const ConfirmModal = ({isOpen,onClose}:ConfirmModalProps) => {
    const router = useRouter();
    const {conversationId} = useConversation()
    const [loading,setLoading] = useState(false)
    const onDelete = useCallback(() => {
        setLoading(true)
        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push(`/conversations`);
                toast.success("Conversation Deleted Successfully",{
                    duration:4000,
                    position:"top-center"
                })
                router.refresh();
            }).catch(() => toast.error("SomeThing Went Wrong",{
                duration:2000,
                position:"top-center",
        }))
            .finally(() => setLoading(false))
    },[conversationId,router,onClose])
    return(
     <Modal onClose={onClose} isOpen={isOpen}>
         <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 flex-shrink-0 w-12 items-center justify-center rounded-full bg-red-300  sm:mx-0 sm:h-10 sm:w-10">
                <FiAlertTriangle className="h-6 w-6 text-red-700" />
            </div>
             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                 <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                     Delete The Conversation
                 </Dialog.Title>
                 <div className="mt-2">
                     <p className="text-sm text-gray-500">Are you Sure To Delete The Conversation</p>
                 </div>
             </div>
         </div>
         <div className="mt-5 gap-x-2 sm:mt-4 sm:flex sm:flex-row-reverse">
             <Button variant="destructive" disabled={loading} size="default" onClick={onDelete}>
                 Delete
             </Button>
             <Button variant={"ghost"} disabled={loading} size={"default"} onClick={onClose}>
                 Cancel
             </Button>
         </div>
     </Modal>
    )
}

export default ConfirmModal