"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TEMPLATE as TEMPLATE_LIST } from "../_component/TemplateListsSection";

export interface HistoryItem {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

export default function History() {
  const { user, isLoaded } = useUser();
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.emailAddresses[0].emailAddress) return;
      setLoading(true);
      try {
        const res = await fetch("/api/history");
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setHistoryList(data);
      } catch (error) {
        alert("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    
    if (isLoaded) fetchHistory();
  }, [user?.emailAddresses, isLoaded]);

  const GetTemplateData = (slug: string) => {
    const template = TEMPLATE_LIST.find((item) => item.slug === slug);
    return {
      name: template?.name || "Unknown Template",
      icon: template?.icon || "/default-icon.png"
    };
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Copy failed"));
  };

  if (loading) {
    return <div className="m-5 p-5">Loading your history...</div>;
  }



  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content history</p>
      
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {historyList.length > 0 ? (
        historyList.map((item) => {
          const { name, icon } = GetTemplateData(item.templateSlug);
          return (
            <div key={item.id} className="grid grid-cols-7 my-5 py-3 px-3 border-b">
              <div className="col-span-2 flex gap-2 items-center">
                <Image
                  src={icon}
                  width={25}
                  height={25}
                  alt={name}
                  className="object-contain"
                />
                <span>{name}</span>
              </div>
              <p className="col-span-2 line-clamp-3">{item.aiResponse}</p>
              <time dateTime={item.createdAt}>
                {new Date(item.createdAt).toLocaleDateString()}
              </time>
              <p>{item.aiResponse.split(/\s+/).filter(Boolean).length}</p>
              <div>
                <Button
                  variant="ghost"
                  className="text-primary"
                  onClick={() => handleCopy(item.aiResponse)}
                >
                  Copy
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center mt-5">No history found for your account.</p>
      )}
    </div>
  );
}
