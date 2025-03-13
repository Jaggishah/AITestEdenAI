"use client";

import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { userInfo} from "@/services/getAuth";
import Image from 'next/image'
import React, { useContext } from 'react'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const page = () => {
const router = useRouter()
const createUser = useMutation(api.users.addUser)
const { user, setUser } = useContext(AuthContext)
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse:any) => {
      console.log(tokenResponse);
        localStorage.setItem('token', tokenResponse.access_token);
        const user = await userInfo(tokenResponse.access_token);
        const userInfoData = await createUser({name: user.name, email: user.email, picture: user.picture});
        setUser(userInfoData)
        router.replace("/ai-page")
    },
    onError: errorResponse => console.log(errorResponse),
  });
    
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center border border-gray-200 p-10 rounded-lg shadow-lg w-96 gap-2'>
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
            <p className='text-xl font-bold'>Sign In</p>
            <Button className='cursor-pointer' onClick={() => googleLogin()}>Sign in with Google</Button>
        </div>
      
    </div>
  )
}

export default page
