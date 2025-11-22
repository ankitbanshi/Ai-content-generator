"use client";
import Template from "../../(data)/Template";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import type { TEMPLATE as TemplateType } from "@/types/templates";

export const TEMPLATE = Template as TemplateType[];

interface TemplateListSectionProps {
  userSearchInput: string;
}

function TemplateListSection({ userSearchInput }: TemplateListSectionProps) {
  const [templateList, setTemplateList] = useState<TemplateType[]>(TEMPLATE);

  useEffect(() => {
    if (userSearchInput) {
      const filteredData = TEMPLATE.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filteredData);
    } else {
      setTemplateList(TEMPLATE);
    }
  }, [userSearchInput]);

  return (
    <div className="px-3 py-5 md:px-5 md:py-10 lg:px-10 lg:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {templateList.map((item: TemplateType, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
