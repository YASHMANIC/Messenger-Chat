"use client"
import * as z from "zod"
import { useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Social from "@/components/social";
import Link from "next/link";
import {Register} from "@/actions/register";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useRouter} from "next/navigation";


const RegisterForm = () => {
    const [isPending,startTransition] = useTransition()
     const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
    const router = useRouter()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    });
    const onSubmit = (values:z.infer<typeof RegisterSchema>) => {
            startTransition(()=>{
            Register(values).then((data) => {
                if(data.error){
                    setError(data.error);
                }
                if(data.success){
                setSuccess(data.success);
                window.location.assign("/users")
                }
            })
        })
    }
    return(
        <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
            <div className=" space-y-4 bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name={"name"}
                           render={({field}) => (
                               <FormItem>
                                  <FormLabel>Name</FormLabel>
                                           <FormControl>
                                               <Input placeholder={"Example"} disabled={isPending} {...field}/>
                                           </FormControl>
                                           <FormMessage/>
                               </FormItem>
                           )}
                        />
                        <FormField control={form.control} name={"email"}
                           render={({field}) => (
                               <FormItem>
                                  <FormLabel>Email</FormLabel>
                                           <FormControl>
                                               <Input type={"email"} placeholder="example@gmail.com" disabled={isPending} {...field}/>
                                           </FormControl>
                                           <FormMessage/>
                               </FormItem>
                           )}
                        />
                        <FormField control={form.control} name={"password"}
                           render={({field}) => (
                               <FormItem>
                                  <FormLabel>Password</FormLabel>
                                           <FormControl>
                                               <Input type={"password"} placeholder={"******"} disabled={isPending} {...field}/>
                                           </FormControl>
                                           <FormMessage/>
                               </FormItem>
                           )}
                        />
                       <FormError message={error}/>
                        <FormSuccess message={success}/>
                          <Button className="w-full" disabled={isPending} size="icon" variant="default">
                                SignUp
                          </Button>
                    </form>
                </Form>
                <div className="mt-6 flex text-center justify-center">
                    <div className="relative">
                        <span className="text-muted-foreground text-sm font-normal">Or Continue With</span>
                    </div>
                </div>
                <Social/>
                <div>
                    <Link href={"/"}>
                        <p className="text-center text-sm font-normal text-muted-foreground">{"Already have a Account"}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm