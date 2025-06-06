"use client"
import React, { useState } from "react";
import axio from 'axios'
import { Loader, Loader2Icon } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useContext } from "react";
interface Plan {
  name: string;
  price: number;
  features: string[];
  button: {
    label: string
  };
}

const plans: Plan[] = [
  {
    name: "Free",
    price:0,
    features: [
      "10,000 Words/Month",
      "50+ Content Templates",
      "Unlimited Download & Copy",
      "1 Month of History",
    ],
    button: {
      label: "Currently Active Plan",

    },
  },
  {
    name: "Monthly",
    price: 10000,
    features: [
      "1,00,000 Words/Month",
      "50+ Template Access",
      "Unlimited Download & Copy",
      "1 Year of History",
    ],
    button: {
      label: "Get Started",
    },
  },
];

const baseButtonStyle =
  "border-2 hover:bg-black border-indigo-500 text-indigo-700 font-semibold rounded-full px-8 py-2 mt-6 transition group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const billing = () =>{ 
   const[loading,setLoading]=useState(false);
   const {user}=useUser();
   const {userSubscription,setUserSubscription}=useContext(UserSubscriptionContext)
  const CreateSubscription=()=>{
    setLoading(true);
            axio.post('/api/create-subscription',{})
            .then(resp=>{
              console.log(resp.data);
              OnPayment(resp.data.id)
            },(error)=>{
              setLoading(false)
            })
  }
  
  const OnPayment=(subId:string)=>{
           const options={
            "key":process.env.NEXT_REZORPAY_KEY_ID,
            "subscription_id":subId,
            "name":'Ai-content-generaton',
            description: "monthly subscription",
            handler:async(resp:any)=>{
              console.log(resp);
              if(resp){
                SaveSubscription(resp?.razorpay_payment_id);
              }
              setLoading(false);
            }
           }
           const rzp=window.Razorpay(options);
           rzp.open();
  }
  const SaveSubscription =async(paymentId:string)=>{
      if (!paymentId) {
    console.log("paymentId is missing!");
    return;
  }
       const result= await db.insert(UserSubscription)
       .values({
        email:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        active:true,
        paymentId:paymentId,
        joinedDate: new Date().toISOString().split('T')[0]
       } )
       console.log(result);
       if(result){
        window.location.reload();
       }
  }
  
  return (
    <div>
      <script src="https://checkout.rezorpay.com/v1/checkout.js"></script>
  <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center py-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">
      Upgrade With Monthly Plan
    </h2>
    <div className="flex flex-col md:flex-row gap-8">
      {plans.map((plan, idx) => (
        <div
          key={plan.name}
          className="bg-white rounded-2xl shadow-md p-8 w-80 flex flex-col items-center group"
        >
          <div className="mb-2 text-lg font-semibold">{plan.name}</div>
          <div className="flex items-end mb-1">
            
              <span className="text-3xl font-bold ">
                {plan.price}Rs  
              </span>
            
            <span className="ml-1 text-base font-normal text-gray-500">
              /month
            </span>
          </div>
          <ul className="text-gray-700 text-sm space-y-2 mt-4 mb-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <svg
                  className="w-4 h-4 text-indigo-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
          disabled={loading}
             className={`${baseButtonStyle}`}
  onClick={CreateSubscription}
       
          >{loading&&<Loader2Icon className="animate-spin"/>}
            {userSubscription?'Active plane': plan.button.label}
          </button>
        </div>
      ))}
    </div>
  </div></div>
)};

export default billing;
