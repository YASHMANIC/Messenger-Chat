"use server"

import * as z from "zod";
import {RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";

export const Register = async(values:z.infer<typeof RegisterSchema>) => {
     const validateFields = RegisterSchema.safeParse(values);
    if(!validateFields.success){
       return {error:"Invalid Fields"}
      }
    const {name,email,password} = validateFields.data
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
         data:{
            name,
            email,
            hashedPassword:hashPassword,
        }
    })
    return {success:"Account successfully registered"};
}