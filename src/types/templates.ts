export interface FormField {
  label: string;
  field: "input" | "textarea" | "select";
  name: string;
  required?: boolean;
  options?: string[];
}

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category?: string;
  slug: string;
  aiPrompt?: string;
  form?: FormField[];
}

export type TEMPLATES = TEMPLATE[];
