"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import type { TEMPLATE, FormField } from "@/types/templates";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  loading: boolean;
  userFormInput: (formData: Record<string, string>) => void;
}

const FormSection: React.FC<PROPS> = ({
  selectedTemplate,
  loading,
  userFormInput,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-lg bg-white border rounded-lg">
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt="icon" width={70} height={70} />
      )}
      <h2 className="font-bold text-2xl mb-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item: FormField) => (
          <div className="my-2 flex flex-col gap-2 mb-7" key={item.name}>
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
              />
            ) : item.field === "select" ? (
              <select
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
                className="border rounded p-2"
              >
                {(item.options || []).map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}

        <Button type="submit" disabled={loading} className="w-full py-6">
          {loading && <Loader2Icon className="animate-spin mr-2 inline" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
