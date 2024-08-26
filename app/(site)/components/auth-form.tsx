"use client"
import * as z from "zod"
import {useEffect, useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {LoginSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Social from "@/components/social";
import Link from "next/link";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [loading,setLoading] = useState(false)
      const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
    useEffect(() => {
        if (session?.status === "authenticated"){
            router.push("/users")
        }
    }, [session?.status]);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    });
    const onSubmit = (values:z.infer<typeof LoginSchema>) => {
        setLoading(true)
        setError("");
        setSuccess("");
        signIn('credentials',{
            ...values,
            redirect:false
        }).then((data) => {
            if(data?.error){
                setError(data.error);
            }
            if(data?.ok && !data?.error){
                setSuccess("Successfully Logged In")
                router.push("/users")
            }
        }).finally(() => {
            form.reset()
            setLoading(false)
        })
    }
    return(
        <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
            <div className=" space-y-4 bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name={"email"}
                           render={({field}) => (
                               <FormItem>
                                  <FormLabel>Email</FormLabel>
                                           <FormControl>
                                               <Input type={"email"} placeholder="example@gmail.com" disabled={loading} {...field}/>
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
                                               <Input type="password" placeholder={"******"} disabled={loading} {...field}/>
                                           </FormControl>
                                           <FormMessage/>
                               </FormItem>
                           )}
                        />
                         <Button disabled={loading} type={"submit"} className="w-full" size="icon" variant="default">
                    LogIn
                </Button>
                    </form>
                </Form>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <div className="mt-6 flex text-center justify-center">
                    <div className="relative">
                        <span className="text-muted-foreground text-sm font-normal">Or Continue With</span>
                    </div>
                </div>
                <Social/>
                <div>
                    <Link href={"/sign-up"}>
                        <p className="text-center text-sm font-normal text-muted-foreground">{"Don't have a Account"}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default AuthForm