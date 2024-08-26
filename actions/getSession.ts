import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function getSession(){
    // @ts-ignore
    return await getServerSession(authOptions)
}