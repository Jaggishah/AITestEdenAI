import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const Header = () => {
    const { user } = useContext(AuthContext)
    
  return (
    <div className='flex items-center justify-between p-4 shadow-sm fixed'>
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      { user?.picture && <Image src={user?.picture} alt="logo" width={40} height={40} 
        className='rounded-full'
      />}
    </div>
  )
}

export default Header
