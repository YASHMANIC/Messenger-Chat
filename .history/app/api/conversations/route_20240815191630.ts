import getCurrentUser from "@/actions/useCurrentUser";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(
    request:Request
){
   try {
        const currentUser = await getCurrentUser();
        console.log(currentUser)
    const body = await request.json();
    const {userId,isGroup,members,name} = body
       if(!currentUser?.id ||  !currentUser?.email){
           return new NextResponse("Unauthorized",{status:401})
       }
       if(isGroup && (!members || members.length < 2 || !name)){
           return new NextResponse("Invalid Data",{status:400})
       }
       if(isGroup){
           const newConversation = await db.conversation.create({
               data:{
                   name,
                   isGroup,
                   users:{
                       connect:[
                           ...members.map((member:{value:string}) =>( {
                               id:member.value
                           })),{
                            id:currentUser.id
                           }
                       ]
                   }
               },
               include:{
                   users:true
               }
           });
           return NextResponse.json(newConversation)
       }
       const existingConversations = await db.conversation.findMany({
           where:{
               OR:[
                   {
                       userIds:{
                           equals:[currentUser.id,userId]
                       }
                   },
                   {
                       userIds:{
                           equals:[userId,currentUser.id]
                       }
                   }
               ]
           }
       });
       const singleConversation = existingConversations[0]
       if (singleConversation){
           return NextResponse.json(singleConversation)
       }
       const newConversation = await db.conversation.create({
           data:{
            users:{
                connect:[
                    {
                        id:currentUser.id},{
                        id:userId}
                ]
            }
           },
           include:{
               users:true
           }
       })
       return NextResponse.json(newConversation)
   }catch (error:any){
       return new NextResponse("Internal Error",{status:500})
   }
}