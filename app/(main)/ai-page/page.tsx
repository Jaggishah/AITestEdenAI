"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"

import React, { useState } from 'react'
import AiAssistantsList from '@/components/AiAssistantsList'

import Image from 'next/image'

interface Coach {
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

  return (
    <div className='px-10 mt-10 md:px-28 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Select AI Assitant to assist 🚀 </h1>
        <Button>Continue</Button>
      </div>
      <div className='grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {AiAssistantsList.map((assistant,index) => (
          <div key={assistant.id + assistant.name} className='hover:border p-3 rounded-xl hover:scale-105 transform transition duration-300 ease-in-out border dark:border-gray-700 cursor-pointer relative' 
          onClick={() => handleSelect(assistant)}>
            <Checkbox className='absolute m-2' checked={ItemChecked(assistant)}  />
            <Image src={assistant.image} alt={assistant.name} 
              width={600} height={600}
              className='w-full h-[200px] object-cover rounded-lg object-top'
            />
            <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
            <h2 className='text-center text-gray-600 dark:text-gray-50'>{assistant.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
