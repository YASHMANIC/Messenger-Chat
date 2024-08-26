"use client"

import {User} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "sonner";
import Modal from "@/components/Modal";
import {Input} from "@/components/ui/input";
import SetInput from "@/components/ui/SetInput";
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import {Button} from "@/components/ui/button";
interface SettingsModalProps {
    currentUser:User,
    isOpen?:boolean,
    onClose:() => void,
}

const SettingsModal = ({currentUser,isOpen,onClose}:SettingsModalProps) => {
    const router = useRouter()
    const[isLoading,setIsLoading] = useState(false)
    const {register,setValue,watch,
    handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:currentUser?.name,
            image:currentUser?.image,
        }
    })
    const image = watch('image')
    const handleUpload = (result:any) =>{
        setValue('image',result?.info?.secure_url,{
            shouldValidate:true
        })
    }
    const onSubmit :SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('/api/settings',data).then(() =>{
            router.refresh();
            onClose();
            toast.success("Changes Applied Successfully",{
                duration:3000,
                position:"top-center"
            })
        }).catch(() => toast.error("SomeThing Went Wrong",{
            duration:3000,
            position:"top-center"
        })).finally(() => setIsLoading(false))
    }
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 taxt-gray-600">
                            Edit Your Information
                        </p>
                        <div className="flex flex-col mt-10 gap-y-8">
                            <SetInput disabled={isLoading} label={"Name"} id={"name"} register={register} errors={errors} required/>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image height={50} width={50} className="rounded-md" src={image|| currentUser?.image ||'/avatar.png'} alt={"Avatar"}/>
                                   <CldUploadButton options={{maxFiles:1}} onSuccess={handleUpload} uploadPreset="Messenger">
                                    <Button disabled={isLoading} size={"sm"} type={"button"}>
                                        Change
                                    </Button>
                                   </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-3">
                        <Button disabled={isLoading} variant="outline" onClick={onClose}>Cancel</Button>
                        <Button disabled={isLoading} variant="default" type={"submit"}>Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default SettingsModal