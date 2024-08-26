import {NextResponse} from "next/server";
import getCurrentUser from "@/actions/useCurrentUser";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";

interface Iparams{
    conversationId?:string
}

export async function POST(
    request:Request,
    {params}:{params:Iparams}
){
        try{
            const currentUser = await getCurrentUser()
            const {conversationId} = params
            if(!currentUser?.id || !currentUser?.email){
                return new NextResponse("Unauthorized",{status:401})
            }
            const conversation = await db.conversation.findUnique({
                where:{
                    id:conversationId
                },
                include:{
                    messages:{
                        include:{
                            seen:true
                        }
                    },
                    users:true
                }
            })
            if(!conversation){
                return new NextResponse("Invalid Id",{status:400})
            }
            const lastMessage = conversation.messages[conversation.messages.length-1]
            if(!lastMessage){
                return NextResponse.json(conversation)
            }
            const updatedMessage = await db.message.update({
                where:{
                    id:lastMessage.id
                },
                include:{
                    seen:true,
                    sender:true
                },
                data:{
                    seen:{
                        connect:{
                            id:currentUser.id
                        }
                    }
                }
            });
            await pusherServer.trigger(currentUser.email!,'conversation:update',{
                id:conversationId,
                messages:[updatedMessage]
            })
            if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
                return NextResponse.json(conversation)
            }
            await pusherServer.trigger(conversationId!,'message:update',updatedMessage)
            return NextResponse.json(updatedMessage)
        }
        catch(error){
            console.log('[SEEN_ERROR]',error)
            return new NextResponse("Internal Server Error",{status:500})
        }
}