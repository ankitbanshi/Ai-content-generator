"use client"
import React, { useState } from 'react'
import SideNav from './_component/SideNav';
import Header from './_component/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';
function DashboardLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     
  const[totalUsage,setTotalUsage]=useState<number>(0);
   const [userSubscription,setUserSubscription]=useState<boolean>(false);
  const [updateCreditUsage,setUpdateCreditUsage]=useState<number>(0)

  return (
    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{userSubscription,setUserSubscription}}>
    <UpdateCreditUsageContext.Provider value={{ updateCreditUsage,setUpdateCreditUsage}}>
    <div className=' bg-slate-200 min-h-screen'>
      <div>
      <div className='md:w-64 hidden md:block fixed'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header/>
          {children}</div>
      </div>

    </div>
    </UpdateCreditUsageContext.Provider>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  )
}

export default DashboardLayout
