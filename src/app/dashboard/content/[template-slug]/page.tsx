"use client";
import React, { useState, use } from "react";
import { useUser } from "@clerk/nextjs";
import FormSection from "../_components/FormSection";
import { TEMPLATE } from "../../_component/TemplateListsSection";
import Template from "@/app/(data)/Template";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import dynamic from "next/dynamic";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation"; // Correct for app directory
import { useContext } from "react";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: Promise<{
    "template-slug": string;
  }>;
}

// Dynamically import OutputSection with SSR disabled
const OutputSection = dynamic(() => import("../_components/OutputSection"), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">Loading editor...</div>,
});

const CreateNewContent = ({ params }: PROPS) => {
  const resolvedParams = use(params);
  const { "template-slug": templateSlug } = resolvedParams;
  const { user } = useUser();
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (items) => items.slug === templateSlug
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const router = useRouter();
  const [totalUsage, setTotalUsage] = useState<any>(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const{setUpdateCreditUsage}=useContext(UpdateCreditUsageContext)
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 100000 && !userSubscription) {
      alert("please upgrade");
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
      await SaveInDb(formData, selectedTemplate?.slug, aiResponse);
    } catch (error) {
      console.error("AI generation error:", error);
      setAiOutput("Error generating content");
    } finally {
      setLoading(false);
      setUpdateCreditUsage(Date.now());
    }
  };
  const SaveInDb = async (formData: any, slug: any, aiRes: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiRes,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
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
