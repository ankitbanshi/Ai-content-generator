import React from 'react'
import { Search } from 'lucide-react'

function SearchSection({onSearchInput}:any) {
  return (
    <div>
      <div className="p-10 bg-gradient-to-bl text-white from-purple-500 via-purple-700 to-blue-400 flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold">Browse all Templates</h2>
        <p>What would you like to create today?</p>
        <div className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">Search your content</label>
          <div className="flex gap-2 items-center p-2 border rounded bg-white">
            <Search className="text-gray-500" />
            <input
              id="search"
              type="text"
              onChange={(event)=>onSearchInput(event.target.value)}
              placeholder="Search your content"
              className="bg-transparent outline-none text-black placeholder-gray-400 flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSection
