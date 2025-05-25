"use client";
import React, { useState, use } from 'react'
import FormSection from '../_components/FormSection'
import { TEMPLATE } from '../../_component/TemplateListsSection'
import Template from '@/app/(data)/Template'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { chatSession } from "@/utils/AiModel";
import dynamic from 'next/dynamic';

interface PROPS {
  params: Promise<{
    "template-slug": string;
  }>
}

// Dynamically import OutputSection with SSR disabled
const OutputSection = dynamic(
  () => import('../_components/OutputSection'),
  { 
    ssr: false,
    loading: () => <div className="p-4 text-gray-500">Loading editor...</div>
  }
);

const CreateNewContent = ({ params }: PROPS) => {
  const resolvedParams = use(params);
  const { "template-slug": templateSlug } = resolvedParams;

  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (items) => items.slug === templateSlug
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');

  const GenerateAIContent = async (FormData: any) => {
    const SelectedPrompt = selectedTemplate?.aiPrompt || "";
    setLoading(true);
    const FinalAIPrompt = JSON.stringify(FormData) + ", " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponse = await result.response.text();
      setAiOutput(aiResponse);
    } catch (error) {
      console.error("AI generation error:", error);
      setAiOutput("Error generating content");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
        <Button><ArrowLeft /> Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <FormSection 
          selectedTemplate={selectedTemplate} 
          loading={loading}
          userFormInput={GenerateAIContent}
        />
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent;
