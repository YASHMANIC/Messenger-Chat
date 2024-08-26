import getCurrentUser from "@/actions/useCurrentUser";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";

interface Iparams{
    conversationId: string;
}

export async function DELETE(
   request: Request,
   {params}:{params:Iparams}
){
    try {
        const currentUser = await getCurrentUser()
    const {conversationId} = params
        if(!currentUser?.id){
            return new NextResponse("Unauthorized",{status:401})
        }
        const existingConversation = await db.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        })
        if (!existingConversation){
            return new NextResponse("Invalid Id",{status:400})
        }
        const deletedConversation = await db.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            },
        })

        existingConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',existingConversation)
            }
        })

        return NextResponse.json(deletedConversation)
    }catch (error:any){
        console.error("[DELETE_CONVERSATION]",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}