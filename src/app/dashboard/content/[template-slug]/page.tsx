"use client";

import React, { useState, useContext, use } from "react";
import { useUser } from "@clerk/nextjs";
import FormSection from "../_components/FormSection";
import type { TEMPLATE as TemplateType } from '@/types/templates';
import { TEMPLATE as TEMPLATE_LIST } from '../../_component/TemplateListsSection';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import dynamic from "next/dynamic";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

// Dynamically import editor
const OutputSection = dynamic(() => import("../_components/OutputSection"), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">Loading editor...</div>,
});

interface Props {
  params: Promise<{
    "template-slug": string;
  }>;
}

const CreateNewContent = ({ params }: Props) => {
  // Unwrap params since it's now a Promise
  const resolvedParams = use(params);
  const { "template-slug": templateSlug } = resolvedParams;

  const { user } = useUser();
  const selectedTemplate: TemplateType | undefined = TEMPLATE_LIST.find((item) => item.slug === templateSlug);

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const router = useRouter();

  const GenerateAIContent = async (formData: Record<string, string>) => {
    if (totalUsage >= 100000 && !userSubscription) {
      alert("Please upgrade your plan to continue.");
      router.push("/dashboard/billing");
      return;
    }

    const SelectedPrompt = selectedTemplate?.aiPrompt || "";
    setLoading(true);
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponse = await result.response.text();

      setAiOutput(aiResponse);
      await SaveInDb(formData, selectedTemplate?.slug || "", aiResponse);
    } catch (error) {
      console.error("AI generation error:", error);
      setAiOutput("Error generating content");
    } finally {
      setLoading(false);
      setUpdateCreditUsage(Date.now());
    }
  };

  const SaveInDb = async (
    formData: Record<string, string>,
    slug: string,
    aiRes: string
  ) => {
    try {
      await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug,
        aiResponse: aiRes,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          loading={loading}
          userFormInput={GenerateAIContent}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
