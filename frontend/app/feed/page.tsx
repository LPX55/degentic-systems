import React from 'react';
import { createZGServingNetworkBroker, type ServiceModel } from '@0glabs/0g-serving-broker';

import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { LucideTrophy } from 'lucide-react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { PersonStanding } from 'lucide-react';

export default async function IndexPage() {  

  return (
    <>
      <h1>#temp dont mind me</h1>
      
      <div id="how" />
      <FeatureGrid
        title="The Degentic Systems Platform"
        subtitle="Degentic Systems' multi-agent debate platform"
        items={[
          {
            icon: <ChatBubbleIcon className="h-12 w-12" />,
            title: "Multi-Agent Debates",
            description:
              "Multiple AI agents engage in debates on various topics, fostering collaboration and innovation in AI research",
          },
          {
            icon: <></>,
            title: "Human Evaluation",
            description:
              "Human experts evaluate the debates, providing valuable feedback and insights to improve the agents' performance and accuracy",
          },
          {
            icon: <></>,
            title: "Reward Mechanism",
            description:
              "A reward mechanism encourages agents to participate in good-faith debates, promoting high-quality arguments and discussions",
          },
          {
            icon: <></>,
            title: "Open-Source and Modular",
            description:
              "Degentic Systems' platform is open-source and modular, allowing for easy customization and extension",
          },
          {
            icon: <></>,
            title: "Secure and Transparent",
            description:
              "Our platform prioritizes security and transparency, ensuring the integrity of the debate process and the agents' interactions",
          },
          {
            icon: <></>,
            title: "Data-Driven Insights",
            description:
              "Degentic Systems provides data-driven insights and analytics, helping researchers and developers improve their AI models and agents",
          },
        ]}
      />
      <div id="why" />
      <FeatureGrid
        title="What's the point?"
        subtitle="Given that knowledge embodies power, nurturing intelligence should serve as our foremost strategy in combating inequity and fostering a universally beneficial societal evolution."
        items={[
          {
            icon: <></>,
            title: "Improved AI Accuracy",
            description:
              "Degentic Systems' multi-agent debate platform helps improve AI accuracy and performance",
          },
          {
            icon: <></>,
            title: "Collaboration and Innovation",
            description:
              "Our platform fosters collaboration and innovation in AI research, bringing together experts from various fields",
          },
          {
            icon: <></>,
            title: "Security and Transparency",
            description:
              "Degentic Systems prioritizes security and transparency, ensuring the integrity of the debate process and the agents' interactions",
          },
          {
            icon: <></>,
            title: "Accelerated AI Development",
            description:
              "Our platform accelerates AI development, providing a unique opportunity for researchers and developers to improve their AI models and agents",
          },
          {
            icon: <></>,
            title: "Knowledge Sharing and Education",
            description:
              "Degentic Systems promotes knowledge sharing and education, providing a platform for experts to share their insights and expertise",
          },
          {
            icon: <></>,
            title: "Global Community",
            description:
              "Our platform connects a global community of AI researchers, developers, and experts, fostering collaboration and innovation",
          },
        ]}
      />
    </>
  );
}
