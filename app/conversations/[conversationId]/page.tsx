import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Emptystate from "@/components/emptystate";
import Header from "@/components/conversations/header";
import Body from "@/components/conversations/body";
import InputForm from "@/components/conversations/InputForm";

interface IParams{
    conversationId:string
}

const ConversationId =async ({params}:{params:IParams}) =>{
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)
    if(!conversation){
       return (<div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
               <Emptystate/>
            </div>
        </div>)
    }
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation}/>
                <Body initialMessages={messages}/>
                <InputForm/>
            </div>
        </div>
    )
}
export default ConversationId