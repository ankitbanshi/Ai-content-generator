  "use client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";



function Header() {


  return (
    <div className="p-4 shadow-sm border-b-2 bg-white flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input
          type="text"
          placeholder="search..."
          className="outline-none"
        />
      </div>
      <div className="flex gap-5">
       <p className="bg-primary text-white rounded p-2">Hi User</p>
       <UserButton/>
      </div>
    </div>
  );
}

export default Header;
