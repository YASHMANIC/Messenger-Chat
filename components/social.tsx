"use client"
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";

const Social = () => {
      const onClick = (provider:"google" | "github") =>{
         signIn(provider,{
            redirect:false
        })
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" variant="outline" className="w-full" onClick={() => onClick("google")}>
                <FcGoogle className="w-5 h-5"/>
            </Button>
             <Button size="lg" variant="outline" className="w-full" onClick={() => onClick("github")}>
                <FaGithub className="w-5 h-5"/>
            </Button>
        </div>
    )
}
export default Social