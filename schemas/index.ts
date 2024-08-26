import * as z from "zod"

export const LoginSchema = z.object({
    email:z.string().email({
        message:"email is required"
    }),
    password:z.string().min(1,{
        message:"Password Is Required"
    }),
});

export const RegisterSchema = z.object({
    name:z.string().min(1,{
        message:"Name Is Required"
    }),
    email:z.string().email({
        message:"email is required"
    }),
    password:z.string().min(6,{
        message:"Minimum 6 Characters"
    }),
});

export const InputSchema = z.object({
    message:z.string().min(1,{
        message:"Minimum 1 character is Required To Send a Message"
    }),
})

export const SettingSchema = z.object({
    name:z.string().min(1),
})