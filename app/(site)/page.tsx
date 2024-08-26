import Image from "next/image";
import AuthForm from "@/app/(site)/components/auth-form";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image width="48" height="48" src={"/logo.jpeg"} alt={"Logo"} className="mx-auto w-auto" />
            <h2 className="mt-6 text-3xl text-center font-bold tracking-tight text-gray-950">Sign In To Your Account</h2>
            <AuthForm/>
        </div>
    </div>
  );
}
