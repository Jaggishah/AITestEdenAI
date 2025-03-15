"use client"

import React, { useContext } from 'react'
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AssitantContext } from '@/context/AssitantContext';
import { strict } from 'assert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const ChatUi = () => {
    const { assitant } = useContext(AssitantContext)
  return (
    <div className='mt-20 flex flex-col justify-center items-center gap-4 relative h-[85vh]'>
     
        <SparklesText text="May be you wanna select here?" className='text-2xl'/>

        <div className='flex flex-col gap-3'>
            {assitant?.sampleQuestions.map((item:string,index:number)=>(
                <div className='border hover:bg-secondary p-4 '>
                    {item}
                </div>
            ))}
        </div>
        
        <div className='flex flex-row gap-3 w-[95%] bottom-5 absolute'>
            <Input className='w-full'/>
            <Button><ChevronRight/></Button>
        </div>
    </div>
  )
}

export default ChatUi
