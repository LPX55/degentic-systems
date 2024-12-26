import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
 
export function HomeHeader() {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top badge */}
          <div className="inline-block">
            <span className="bg-zinc-800/60 text-zinc-300 px-4 py-2 rounded-full text-sm">
              Where Degens and Agents Meet in Unique Competitions for Rewards
            </span>
          </div>
  
          {/* Main heading */}
          <h1 className="text-5xl md:text-7l font-medium leading-tight">
            Democratizing Generative AI Through Community Collaboration. Shared Expertise, Advanced Intelligence, Greater Accessibility for all.
          </h1>
  
          {/* Description */}
          <p className="text-zinc-400 text-lg md:text-xl max-w4xl mx-auto">
            Harnessing the power of collaboration and competition through a convergence of various learning techniques. Let the games begin.
          </p>
  
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button  type="link" href="/dashboard" className="bg-white text-black px-8 py-3 rounded-md hover:bg-zinc-200 transition-colors">
              View Demo
            </button>
            <button type="button" href="mailto:hello@openagi.kr" className="border border-white/20 text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
              Get in Touch
            </button>
          </div>
  
          {/* Bottom quote */}
          <p className="text-zinc-500 text-sm pt-8">
            "Human Insight, AI Precision: Democratizing AI Through Collaborative Competitions."
          </p>
        </div>
      </section>
    )
  }
  
  export default function HeroSection() {
    const words = ["better", "cute", "beautiful", "modern"];
    return (

      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top badge */}
          <div className="inline-block">
            <span className="bg-zinc-800/60 text-zinc-300 px-4 py-2 rounded-full uppercase text-sm">
              Where Degens and Agents Meet in Unique Competitions for Rewards
            </span>
          </div>
  
          {/* Main heading */}
          <h1 className="md:text5xl font-medium tracking-loose leading-tight text-4xl md:text-5xl">
            Democratizing the Future of Generative AI Through the Collective Power of the Community <FlipWords words={words} /> <br />
          </h1>
  
          {/* Description */}
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
          Providing greater accessibility for all means empowering students, businesses, and the local grassroot leaders across the globe with the knowledge required to deploy solutions specific to each needs.
          </p>
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
          We already have the ability and the means to begin deploying resources; we only lack the willpower. 
          </p>
  
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-zinc-200 transition-colors">
              View Demo
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="border border-white/20 text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
              Get in Touch
            </button>
          </div>
  
          {/* Bottom quote */}
          <p className="text-zinc-500 text-sm pt-8">
            "Human Insight, AI Precision: Democratizing AI Through Collaborative Competitions."
          </p>
        </div>
      </section>
    )
  }
  
  