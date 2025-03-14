"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { BlurFade } from "@/components/magicui/blur-fade"
import React, { useContext, useEffect, useState } from 'react'
import AiAssistantsList from '@/components/AiAssistantsList'

import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export interface Coach {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
}

function page() {
  const [ selectedAssistant, setSelectedAssistant] = useState<Coach[]>([])
  const insertedAssitant = useMutation(api.aiuserAssitant.adduserAssitant);
  const { user } = useContext(AuthContext);
  const [ loading, setLoading ] = useState<boolean>(false);
  const convex = useConvex();
  const router = useRouter()


  useEffect(() => {
    user && checkAllAssitant()
  },[user])

  const checkAllAssitant = async () => {
    const resutlt = await convex.query(api.aiuserAssitant.getUserAssitant,{
      uid:user?._id
    })

    if (resutlt.length > 0) {
      router.replace("/mainArea")
    }
    console.log(resutlt)
  }
  const handleSelect = (itemData : Coach) => {
    const data =  selectedAssistant.findIndex(item => item.id == itemData?.id)
    if (data !== -1){
      setSelectedAssistant(selectedAssistant.filter(item => item.id !== itemData.id))
      return;
    }
    setSelectedAssistant(prev => [...prev,itemData])

  }

  const ItemChecked = (itemData: Coach)  => {
    return selectedAssistant.some(item => item.id == itemData.id)
  }

  const handleClickContinue = async () => {
    setLoading(true)
    const result = await insertedAssitant({
      records:selectedAssistant,uid:user?._id ?? ""
     })
    setLoading(false)
    console.log(result)
  }
  return (
    <div className='px-10 mt-10 md:px-28 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <BlurFade delay={0.25} inView>
          <h1 className='text-xl font-bold'>Select AI Assitant to assist 🚀 </h1>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <Button className="shadow-2xl" disabled={selectedAssistant.length === 0 || loading } onClick={handleClickContinue}>
            {loading && <Loader2Icon className='animate-spin'/> }Continue</Button>
        </BlurFade>
      </div>
      <div className='grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {AiAssistantsList.map((assistant,index) => (
            <BlurFade key={assistant.id + assistant.name} delay={0.25 + index * 0.05} inView>
            <div className='hover:border p-3 rounded-xl hover:scale-105 transform transition duration-300 ease-in-out border dark:border-gray-700 cursor-pointer relative' 
            onClick={() => handleSelect(assistant)}>
              <Checkbox className='absolute m-2' checked={ItemChecked(assistant)}  />
              <Image src={assistant.image} alt={assistant.name} 
                width={600} height={600}
                className='w-full h-[200px] object-cover rounded-lg object-top'
              />
              <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
              <h2 className='text-center text-gray-600 dark:text-gray-50'>{assistant.title}</h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default page
