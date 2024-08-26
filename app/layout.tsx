import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authcontext from "@/context/authcontext";
import {Toaster} from "sonner";
import ActiveStatus from "@/components/active-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App Used For Chatting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Authcontext>
          <Toaster/>
          <ActiveStatus/>
      {children}
      </Authcontext>
      </body>
    </html>
  );
}
