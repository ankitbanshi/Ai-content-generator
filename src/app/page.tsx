'use client';
import { Button } from "@/components/ui/button";
import {
  Zap,
  FileText,
  MessageSquare,
  ShoppingBag,
  Mail,
  Search,
  Megaphone,
  CheckCircle,
  Clipboard,
  Edit3,
} from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from 'react';
import Image from 'next/image';


const words = [
  { text: "AI-Powered", className: "text-[#704ef8]" },
  { text: "Content", className: "text-[#704ef8]" },
  { text: "Generation", className: "text-[#704ef8]" },
];

export default function LandingPage() {
  const [loading, setLoading] = useState(true); // State to track loading
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust the speed here

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "AI-Powered Writing",
      description: "Create SEO-optimized blog posts, social media captions, and product descriptions with AI, tailored to your audience.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Streamlined Content Creation",
      description: "Automate your content workflows for blogs, YouTube, Instagram, and more, allowing faster turnaround on content production.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Content Quality Checker",
      description: "Automatically detect and correct grammar, spelling, and style issues to ensure your content is polished and professional.",
    },
    {
      icon: <Clipboard className="h-6 w-6" />,
      title: "Template Library",
      description: "Access a growing library of pre-built templates for various content types, including blogs, social media, and marketing.",
    },
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: "Plagiarism-Free Rewrite",
      description: "Easily rewrite existing content while ensuring it remains plagiarism-free and optimized for search engines.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Advanced Text Refinement",
      description: "Refine your writing by eliminating redundancies, fixing grammar issues, and adding clarity, using Gemini-powered AI.",
    },
  ];

  const useCases = [
    { icon: <FileText />, title: "Blog Posts and Articles", description: "Generate engaging blog content and in-depth articles on various topics." },
    { icon: <MessageSquare />, title: "Social Media Content", description: "Create catchy posts and captions for multiple social media platforms." },
    { icon: <ShoppingBag />, title: "Product Descriptions", description: "Craft compelling product descriptions for e-commerce websites." },
    { icon: <Mail />, title: "Email Newsletters", description: "Compose informative and engaging email newsletters for your subscribers." },
    { icon: <Search />, title: "SEO Optimized Content", description: "Generate content optimized for search engines to improve rankings." },
    { icon: <Megaphone />, title: "Marketing Copy", description: "Create persuasive marketing copy for various campaigns and platforms." },
  ];

  // Simulate loading time (e.g., 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {loading ? (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black'>
        <div className='w-24 h-24'>
          
        </div>
  
        <div className='mt-6 w-3/4 max-w-xs'>
          <div className='w-full text-white rounded-full h-2.5'>
            <div
              className='bg-[#704ef8] h-2.5 rounded-full text-white'
              style={{ width: `${progress}%`, color:'white' }}
            ></div>
          </div>
          <p className='text-center mt-2 text-gray-700'>{progress}%</p>
        </div>
      </div>
      ) : (
        <>
       
          <main className="container mx-auto">
            <section className="text-center my-16 sm:my-20 px-3 sm:px-4 md:px-0">
              <div>
                <h1 className="items-center justify-center font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#704ef8] to-[#a78bfa] overflow-hidden md:flex hidden">
                  
                </h1>
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#704ef8] to-[#a78bfa] md:hidden">
                  AI-Powered Content Generation
                </h1>
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Revolutionize your content creation process with our advanced AI technology. Generate high-quality, engaging content in seconds.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/dashboard">
                    <Button className="bg-[#704ef8] text-white hover:bg-[#5a3cc7] w-fit mx-auto px-10 md:mx-0">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      variant="outline"
                      className="border-[#704ef8] text-[#704ef8] hover:bg-[#704ef8] hover:text-white bg-slate-200 w-fit mx-auto px-10 md:mx-0"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent my-12 sm:my-16"></div>

            <section id="features" className="mb-16 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-3 sm:px-4 md:px-0">
                {features.map((feature, index) => (
                  <div key={index}>
                    
                  </div>
                ))}
              </div>
            </section>

            <section id="how-it-works" className="mb-16 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">How It Works</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-3 sm:px-4 md:px-0">
                {[
                  { step: "1", title: "Input Your Requirements", description: "Specify your content needs, target audience, and desired tone." },
                  { step: "2", title: "AI Processing", description: "Our advanced AI analyzes your input and generates tailored content." },
                  { step: "3", title: "Review and Publish", description: "Edit the generated content if needed, then publish with confidence." },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#704ef8] group-hover:w-4 transition-all"></div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="pricing" className="mb-16 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Pricing</h2>
              
            </section>

            <section id="testimonials" className="mb-16 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">What Our Users Say</h2>
              
            </section>

            <section id="faq" className="mb-16 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">FAQ</h2>
              
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent my-12 sm:my-16"></div>

          </main>
        </>
      )}
    </div>
  );
}