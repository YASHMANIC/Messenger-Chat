import Sidebar from "@/components/sidebar/sidebar";
import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/conversation-list";
import getUsers from "@/actions/getUsers";


const ConversationsLayout =async ({children}:{children:React.ReactNode}) => {
    const conversations = await getConversations()
    const users = await getUsers()
    return(
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations} users={users}/>
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationsLayout