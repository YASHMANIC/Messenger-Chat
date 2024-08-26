import Sidebar from "@/components/sidebar/sidebar";
import UsersList from "@/components/users/users-list";
import getUsers from "@/actions/getUsers";

const UsersLayout =async ({children}:{children:React.ReactNode})  => {
    const users = await getUsers()
    return(
        // @ts-ignore
        <Sidebar>
            <div className="h-full">
                <UsersList items={users}/>
                {children}
            </div>
        </Sidebar>
    )
}
export default UsersLayout