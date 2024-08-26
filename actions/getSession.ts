import {getServerSession} from "next-auth";
import {authOptions} from "@/src/auth-options";


export async function getSession(){
    return await getServerSession(authOptions)
}