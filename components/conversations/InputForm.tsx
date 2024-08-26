"use client"

import useConversation from "@/hooks/useConversation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {InputSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {HiPhoto} from "react-icons/hi2";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoIosSend} from "react-icons/io";
import {CldUploadButton} from "next-cloudinary";
import {useState} from "react";
import {toast} from "sonner";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";


const InputForm = () =>{
    const {conversationId} = useConversation()
    const [loading,setLoading] = useState(false)
    const form = useForm<z.infer<typeof InputSchema>>({
        resolver:zodResolver(InputSchema),
        defaultValues:{
            message: "",
        }
    })
    const onSubmit = (values:z.infer<typeof InputSchema>) =>{
        setLoading(true)
       axios.post("/api/messages",{
           ...values,
           conversationId
       }).catch(() => toast.error("Unable To Send Message",{
           duration:3000,
           position:"top-center"
       }))
           .finally(() => {
               setLoading(false)
               form.reset();
           })
    }
    const handleUpload= (result:any) =>{
        axios.post("/api/messages",{
            image:result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div className="px-4 py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <div aria-disabled={true}>
                <CldUploadButton  options={{maxFiles: 1}} onSuccess={handleUpload} uploadPreset="Messenger">
                <HiPhoto size={25}/>
            </CldUploadButton>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                    <FormField name={"message"} control={form.control}
                               render={({field}) => (
                                   <FormItem className="relative w-full">
                                       <FormControl>
                                           <Input disabled={loading} required={true}
                                                  placeholder={"Write a Message"}
                                                  {...field}
                                                  className="text-black font-light px-2 py-4 bg-neutral-100 w-full rounded-full focus:outline-none"/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                    <Button size={"icon"} type={"submit"} disabled={loading}
                            className="rounded-full p-2 cursor-pointer">
                        <IoIosSend size={20} className="text-white"/>
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default InputForm