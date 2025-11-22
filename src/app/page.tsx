'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, FileText } from "lucide-react";
import Link from "next/link";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#1a1a1a] flex flex-col">

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Create Content Effortlessly with AI
        </h1>

        <p className="text-gray-600 max-w-xl text-lg mb-10">
          A clean and simple AI tool to help you write blogs, captions, product descriptions, 
          and more — all with just a few clicks.
        </p>

        <Link href="/dashboard">
          <Button className="bg-black text-white hover:bg-gray-800 px-10 py-6 rounded-xl text-lg shadow-sm">
            Get Started
          </Button>
        </Link>

        {/* HIGHLIGHTS */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <FileText className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">AI Writing</h3>
            <p className="text-sm text-gray-600 mt-1">
              Generate clean, readable content instantly.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <Zap className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">Fast Results</h3>
            <p className="text-sm text-gray-600 mt-1">
              Get polished content in seconds.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <CheckCircle className="h-8 w-8 text-gray-800 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">Easy to Use</h3>
            <p className="text-sm text-gray-600 mt-1">
              Designed for simplicity and clarity.
            </p>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} AI Content Generator · Minimal & Clean
      </footer>
    </div>
  );
}
