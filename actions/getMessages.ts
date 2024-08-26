import {db} from "@/lib/db";

const getMessages = async (ConversationId:string) => {
    try {
        const messages = await db.message.findMany({
            where:{
                    conversationId:ConversationId
            },
            include:{
                sender:true,
                seen:true,
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return messages
    }catch (error:any){
        return []
    }
}
export default getMessages