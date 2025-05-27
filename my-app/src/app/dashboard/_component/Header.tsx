import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-4 shadow-sm border-b-2 bg-white flex justify-between items-center'>
    <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg  bg-white '>
     <Search/>
     <input type='text' placeholder='search...'
     className='outline-none'/>
    </div>
    <div>
      <h2 className='p-2 bg-primary text-xs text-white px-2 rounded-2xl '>join in for free. Hurry up!!</h2></div></div>
  )
}

export default Header
