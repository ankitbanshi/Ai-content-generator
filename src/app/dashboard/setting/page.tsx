
import React from 'react'
import { Button } from '../../../../my-app/src/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
function Settings() {



  return (
    <div className='h-[100px] flex items-center justify-center'>
          <SignOutButton>
      <Button className='bg-primary text-white rounded-2xl p-5 '>Log out </Button>
      </SignOutButton>
    </div>
  )
}

export default Settings
