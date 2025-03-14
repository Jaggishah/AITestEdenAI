"use client";

import * as React from "react";
import Header from "./_component/Header"
import { userInfo } from "@/services/getAuth"
import { useRouter } from "next/navigation";
import { query } from "@/convex/_generated/server";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { AssitantContext } from "@/context/AssitantContext"


export function Provider({
  children
}: Readonly<{
  children: React.ReactNode;}>) {
    const { user, setUser} = React.useContext(AuthContext)
    const [ assitant, setAssitant ] = React.useState<number | null >(null);
    const router = useRouter()
    const convex = useConvex()
    React.useEffect(() => {
        checkAuth()
    }, [])    

    const checkAuth = async () => {
        const token = localStorage.getItem("token")
        
        const user = token && await userInfo(token);
      
        if (!user || !user.email){
            
            router.replace("/sign-in")
            return
        }
        try{
            const userInfoData = await convex.query(api.users.getUser, {email: user.email})
            console.log(userInfoData,"userInfoData")
            if (!userInfoData){
                router.replace("/sign-in")
                return
            }
            setUser(userInfoData)
        } catch (e){
            router.replace("/sign-in")
            return
        }
    }
  return <div>
    <AssitantContext.Provider value={{assitant,setAssitant}}>
          <Header/>
              {children}
        </AssitantContext.Provider>
  </div>
 
}
