"use client"

import { AssitantContext } from '@/context/AssitantContext'
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import AllModel from "@/components/AiModelOptions"  
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Loader, SaveIcon, Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from "sonner"
import { AlertBox } from "./AlertBox"



const ModelComponent = () => {
    const { assitant, setAssitant } = useContext(AssitantContext);
    const updateAssitant = useMutation(api.aiuserAssitant.updateAssitant);
    const deleteAssitant = useMutation(api.aiuserAssitant.deleteAssitant)
    const [ loading, setLoading ] = useState(false);
    const handleClick = (field:string,value:string) => {
        setAssitant((prev:any) => ({
            ...prev,
            [field]:value
        }))
    }

    const handleonClickSave = async () => {
        setLoading(true)
        await updateAssitant({
            id:assitant?._id,
            userInstruction:assitant?.userInstruction,
            aiModel:assitant?.aiModel
        })
        setLoading(false)
        toast("information saved Successfully.")

    }

    const handleDelete = async() => {
        await deleteAssitant({
            id:assitant?._id,
        })
        toast("information deleted Successfully.")
    }
  return (
    <div className='h-screen bg-secondary border-l-[1px] relative'>
        <div className='p-5 flex flex-col justify-center items-center gap-4'>
            <h2 className='font-bold text-2xl'> Settings </h2>
            <div  className=
            {`flex gap-5 hover:bg-gray-300 p-2 rounded-2xl cursor-pointer dark:bg-gray-600 `}
            onClick={() =>{}}>
                <Image src={assitant?.image} alt={assitant?.name} width={80} height={80} className='object-cover rounded-2xl w-[80px] h-[80px]'/>
                <div className='flex flex-col justify-start '>
                    <h2 className='font-bold text-xl'>{assitant?.name}</h2>
                    <p className='text-gray-600 text-sm dark:text-gray-200'>{assitant?.instruction}</p>
                </div>
            </div>
            <h2 className='text-gray-500 font-bold '> Model</h2>
            <div className=" w-full">
            <Select defaultValue={assitant?.aiModel} onValueChange={(value) => handleClick("aiModel",value)}>
                <SelectTrigger className="w-full bg-white"  >
                    <SelectValue placeholder="Model"/>
                </SelectTrigger>
                <SelectContent>
                    {AllModel?.map((model,index) => (
                        <div className='flex gap-2 items-center'>
                            <Image src={model?.logo} alt="corrupt" width={20} height={20} className='object-cover rounded-2xl w-[20px] h-[20px]'/>
                               <SelectItem value={model?.name} key={model.name + index}>{model?.name}</SelectItem>
                        </div>
                       
                    ))}      
                </SelectContent>
                </Select>

            </div>
            <h2 className='text-gray-500 font-bold '> Instructions: </h2>
            <Textarea className='bg-white h-[150px]' value={assitant?.userInstruction} onChange={(e) => handleClick("userInstruction",e.target.value)} />
        </div>
        <div className='footer absolute bottom-10 flex items-center justify-center w-full gap-4'>
            <AlertBox handleDelete={handleDelete}>
                <Button variant="ghost"><Trash/> Delete</Button>
            </AlertBox>
            
            <Button onClick={handleonClickSave} disabled={loading}> {loading ? <Loader className='animate-spin'/> : <SaveIcon/>} Save</Button>
        </div>
    </div>
  )
}

export default ModelComponent
