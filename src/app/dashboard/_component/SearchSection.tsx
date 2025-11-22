import React from "react";
import { Search } from "lucide-react";

interface SearchSectionProps {
  onSearchInput: (value: string) => void;
}

function SearchSection({ onSearchInput }: SearchSectionProps) {
  return (
    <div>
      <div className="p-10 bg-gradient-to-bl text-black flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold">Browse all Templates</h2>
        <p>What would you like to create today?</p>
        <div className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Search your content
          </label>
          <div className="flex gap-2 items-center p-2 border rounded bg-black ">
            <Search className="text-white" />
            <input
              id="search"
              type="text"
              onChange={(event) => onSearchInput(event.target.value)}
              placeholder="Search your content"
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
