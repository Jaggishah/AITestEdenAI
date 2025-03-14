"use client"

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { Coach } from "../../ai-page/page"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { AssitantContext } from '@/context/AssitantContext';

export const AssitantList = () => {
     const { assitant,setAssitant} = useContext(AssitantContext);
      const convex = useConvex();
      const { user } = useContext(AuthContext);
      const [ localAssitantList, setLocalAssitantList ] = useState<Coach[]>([])

      useEffect(() => {
        user && checkAllAssitant()
      },[user && assitant == null ])
    
      const checkAllAssitant = async () => {
        const resutlt = await convex.query(api.aiuserAssitant.getUserAssitant,{
          uid:user?._id
        })
    
        if (resutlt.length > 0) {
            setLocalAssitantList(resutlt)
        }
        console.log(resutlt)
      }
    const handleAssitantSelection = (assi:Coach) => {
        setAssitant(assi)
    }
  return (
    <div className='bg-secondary border-r-1 h-screen p-5'>
        <div className=' flex flex-col justify-start items-center gap-4'>
            <h1 className='font-bold text-2xl'>Your Ai Assistants</h1>
            <Button className='w-full'>+ Add New Assistant</Button>
            <Input className='bg-white' placeholder='Search'/>
        </div>
        <div className='flex flex-col gap-5 mt-8 0'>
        {localAssitantList?.map((assi, index) => (
            <div key={assi?.name + index} className=
            {`flex items-center gap-5 hover:bg-gray-300 p-2 rounded-2xl cursor-pointer dark:bg-gray-600 ${assitant?.id == assi.id ? "bg-gray-200" : ""}`}
            onClick={() => handleAssitantSelection(assi)}>
                <Image src={assi?.image} alt={assi?.name} width={60} height={60} className='object-cover rounded-2xl w-[60px] h-[60px]'/>
                <div className='flex flex-col justify-start '>
                    <h2 className='font-bold text-xl'>{assi?.name}</h2>
                    <p className='text-gray-600 text-sm dark:text-gray-200'>{assi?.instruction}</p>
                </div>
            </div>
        ))}
        </div>

        <div className='absolute bottom-10 flex items-center justify-center gap-5'>
            <Image src={user?.picture ?? ""} alt="user"
            width={40} height={40} className='rounded-full'/>
            <div className='cursor-crosshair'>
                <h2 className='font-bold'>{user?.name}</h2>
                <h2 className='text-gray-600 text-sm'>{user?.orderId ? "Pro" : "Free"}</h2>
            </div>

        </div>

    </div>
        
  )
}
