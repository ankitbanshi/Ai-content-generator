// src/app/api/createOrder/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {


     let instance=new Razorpay({
       key_id: process.env.REZORPAY_KEY_ID,
      key_secret: process.env.REZORPAY_KEY_SECRET,
     })
    

     const planId = process.env.SUBSCRIPTION_PLAN_ID;
     if (!planId) {
       return NextResponse.json({ error: 'SUBSCRIPTION_PLAN_ID is not set in environment variables.' }, { status: 500 });
     }

     const result = await instance.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
      addons: [],
      notes: {
        key1: 'Note'
      }
     });
   return NextResponse.json(result);

  
  }

