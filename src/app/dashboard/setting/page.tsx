
import React from 'react'
import { Button } from '../../../../my-app/src/components/ui/button'
import { SignOutButton, UserProfile } from '@clerk/nextjs'
function Settings() {



  return (
    <div className='flex justify-center items-center '>
       <UserProfile/>
    </div>
  )
}

export default Settings
