"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { AIOutput } from '@/utils/schema';
import { db } from '@/utils/db';
import {eq} from 'drizzle-orm'
import React, { useEffect } from 'react'
import HistoryItem from '../history/page'

function UsageTrack() {

const {user}=useUser();



useEffect(()=>{
    user && GetData();
},[user])

  const GetData=async()=>{
      {/*@ts-ignore */}
      const results:HistoryItem=await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress));

      GetTotalUsage(results);
    }
 const GetTotalUsage=(results:HistoryItem)=>{
      let total:number=0;
      results.forEach((element: { aiResponse: string | any[]; }) => {
        total=total+Number(element.aiResponse?.length)
    });
  
     console.log(total);}


  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
       <h2 className='font-medium '>Credits</h2> 
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">  <div className='h-2 bg-white rounded-full'
        style={{
          width:'35%'
        }}></div></div>
      <h2 className='text-sm my-1'>350/10,000 credit used</h2>
      </div>
    <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  );
}

export default UsageTrack
