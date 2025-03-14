import React from 'react'
import {AssitantList} from './_components/AssitantList'

function page() {
  return (
    <div className='h-screen fixed w-full'>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
            <AssitantList/>
        </div>
        <div className='md:col-span-4 lg:col-span-3'>
            main
        </div>
        <div className='hidden lg:block'>
             model
        </div>

      </div>
    </div>
  )
}

export default page
