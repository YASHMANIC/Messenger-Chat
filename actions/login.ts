"use server"

import * as z from "zod"
import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {signIn} from "next-auth/react";
import {AuthError} from "next-auth";

export const Login =async (values:z.infer<typeof LoginSchema>) =>{
    const validateFields = LoginSchema.safeParse(values);
    if(!validateFields.success){
       return {error:"Invalid Fields"}
      }
    const {email,password} = validateFields.data
    const existingUser = await getUserByEmail(email);
      if(!existingUser || !existingUser.hashedPassword || !existingUser.email){
          return {error:"Invalid Credentials"}
      }
       try {
            await signIn("credentials",{
                email,
                password,
                redirectTo:false,
            })
            return {success:"Successfully logged in"}
        }catch (error){
            if(error instanceof AuthError){
                switch (error.type){
                    case "CredentialsSignin":
                        return {error:"Invalid Credentials"}
                    default:
                        return {error:"Something Went Wrong"}
                }
            }
            throw error
        }
}