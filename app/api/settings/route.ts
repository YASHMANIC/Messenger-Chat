import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/useCurrentUser";
import {db} from "@/lib/db";

export async function POST(
    request:Request,
){
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const{name,image} = body
        if(!currentUser?.id){
            return new NextResponse("Unauthorized",{status:401})
        }
        const updatedUser = await db.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name:name,
                image:image
            }
        });
        return NextResponse.json(updatedUser)
    }
    catch (error:any){
        console.log("[ERROR_SETTINGS]",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}