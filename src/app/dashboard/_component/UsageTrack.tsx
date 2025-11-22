"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

type HistoryItem = {
  aiResponse: string | string[] | null;
};

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [maxWords, setMaxWords] = useState<number>(100000);

  const GetTotalUsage = useCallback((results: HistoryItem[]) => {
    let total: number = 0;
    results.forEach((element) => {
      total += Number(element.aiResponse?.length || 0);
    });
    setTotalUsage(total);
    console.log(total);
  }, [setTotalUsage]);

  const GetData = useCallback(async (email: string) => {
    const results: HistoryItem[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, email));

    GetTotalUsage(results);
  }, [GetTotalUsage]);

  const IsUserSubscribe = useCallback(async (email: string) => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (result.length > 0) {
      setUserSubscription(true);
      setMaxWords(1000000);
    }
  }, [setUserSubscription]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetData(user.primaryEmailAddress.emailAddress);
      IsUserSubscribe(user.primaryEmailAddress.emailAddress);
    }
  }, [user, GetData, IsUserSubscribe]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetData(user.primaryEmailAddress.emailAddress);
    }
  }, [updateCreditUsage, user, GetData]);

  

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(Number(totalUsage) / Number(maxWords)) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-1">
          {totalUsage}/{maxWords} credit used
        </h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
