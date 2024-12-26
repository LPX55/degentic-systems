🛑 Currently active in the `dev` branch. Will observe for now; trying to see if its the RPC, indexer, or myself causing issues this time. 

# Degentic Systems

**Foreword: This frontend is a proof of concept built and completely refactored out of a private monorepo in the scope of a few days... it's the culmination of many months of collective research in the field of contextual grounding and multi-agent systems. Although a lot of effort has been completed on the integration side with 0G Labs' network, the RPC nodes have been acting up and have been unreliable since last night -- this is to be expected on testnets; however, the frontend has been completely disconnected from the backend for the time being and likely will be kept off until more work can be done on the logical planning and design of the platform. The purpose of this hackathon "entry" is to showcase and inspire the communities to think outside the box and not be afraid to have some fun.**

![Snapshot_39](https://github.com/user-attachments/assets/9a3db142-e288-4800-bdcd-64894892318d)


## Overview

Degentic Systems is an experimental platform developed for Taiwan Blockchain Week 2024 that enables:

- Multi-agent debates with AI participants
- Human expert evaluation and feedback
- Reward mechanisms for good-faith participation
- Data-driven insights for AI model improvement

### Details for Nerds

**What this platform hopes to achieve**

1. Provide a novel method of LLM fine-tuning and training through the contextual grounding and reinforcement learning techniques.
2. Help the industry continue its good fight against the concentration of power held by a handful of tech-giants. 
3. Incentivize the experimentation and creation of new methods in the field of context, indexing, retrieval, prompting, etc., as quality data sources are depleting at an alarming rate. 
4. And have some freakin' fun while doing it. Degen-style.

**Hybrid-Learning Techniques**

The platform employs hybrid-learning styles by inherent design - more on that later (Arxiv paper coming). At this point in time, it's not possible to pinpoint an exact ML domain as our approach is so radically different from the status quo. 

- Multi-Agent Reinforcement Learning (MARL) with Domain-Specific Knowledge Distillation and Human-in-the-Loop Evaluation?
- Domain-based Multi-Agent Adversarial Training & Learning?
- This approach combines elements from Multi-Agent Learning, Adversarial Training, Debate-based Learning, Human-in-the-Loop Learning, Reinforcement Learning from Human Feedback, Multi-Modal Learning, Domain-Specific Learning, Incentivized Learning, etc. Let's just KISS and call it "hybrid-learning" for our sanity's sake.

Some quick examples of how these types apply:
- Multi-Agent, Multi-Supervisor, Multi-Eval: Entities compete to create the strongest performing AI agents (all from the same base model), working independently, each with its own parameters, contextual data, and methodologies. 
- Reinforcement Learning: The agents are learning and improving through a process of trial and error (debating and discussing). They receive feedback (judgment from domain experts) and rewards (motivation to perform better).
- Domain-Specific Knowledge Distillation: The agents are focused on a specific domain, strengthening the LLM's knowledge in that area. We are NOT trying to compete with base LLMs; let's leave that up to those with the billions of dollars at disposal.
- HITL + RLHF: Human domain experts in the loop, at the end, pretty much everywhere from initialization to the evaluation of the agents' performance and accuracy, providing valuable oversight, feedback, and different POVs. 
- Adversarial Learning: The debate-like interaction between agents can be seen as a form of adversarial learning, where each agent tries to outperform the other, with tangible rewards (for the humans) in the form of prizes and sponsorships. 
- And many, many more applicable areas of study.

**Simplified Breakdown of the Process**

Initialization: Supervisors A and B set parameters and contextual data for their respective agents.
Interaction: The agents engage in a debate, using different prompts, contextual backgrounds, and data implementations.
Evaluation: Domain experts judge the agents' performance and accuracy.
Reward: The winning agent receives a reward, motivating both agents to improve.
Repeat: The process continues until sufficient data and discussions are gathered for the model to train on.

Basically: who can leverage SoTA techniques to prepare the best performing LLM without resource-intensive model training. Competing individuals/teams equip a base model with context, data, and instructions regarding a certain topic or theme, let them loose in the debate arena, and hope for the best as chaos and hilarity often ensues. 

## Tech Stack

- Next.js 14 app router
- TypeScript serverless backend for certain APIs and functions
- TailwindCSS, Radix, the "usual" front-stack, nothing special.
- ThirdWeb SDK: quick and easy ERC4337 implementation and gas sponsorship to encourage "normies" to participate without having to touch a single wallet. 
- CCIP and ENSIP10 contract implementation for off-chain verifications and retrievals 

## AI Stack

- 0G Service Brokers for verifiable generation 
- 0G Storage and KV Stores to prevent middleware attacks and data manipulation
- LangChain & Friends
- Current Models (Self-Hosted): mistral-nemo, gpt-4o, o1, lama3.1-70b-instruct, llama3.2, llama3.3-70b-versatile, llava-1.6, qwen-qwq
- Plus models provided by 0G Service Marketplace

## Project Structure

- `/app` - Next.js 14 app router pages and layouts
- `/app/api` - API routes
- `/components` - Reusable React components
- `/lib` - Utility functions, shared logic, ABIs
- `/public` - Static assets
- `/utils` - Utility functions
- `/types` - TypeScript type definitions

Plus more that I'm sure I'm forgetting. Standard structuring, nothing crazy.

## 0G Labs Integration

### API Endpoints

**PAYMENTS SPONSORED BY THE PLATFORM PAYMASTER (for now)**

- **POST /api/storage/upload**
  - Uploads files to 0G storage
  - Accepts multipart/form-data with file field
  - Returns: { rootHash: string, tx: TransactionResponse }

- **POST /api/models/request**
  - Sends requests to AI models
  - Body: { 
    providerAddress: string,
    serviceName: string, 
    content: string
  }
  - Returns: OpenAI-compatible completion response

- **GET /api/models/list**
  - Lists available AI service models
  - Returns: ServiceModel[]

### Verifiable storage for RAG-based methods and related data for dispute resolution

```
async function uploadToStorage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/storage/upload', {
    method: 'POST',
    body: formData
  });

  const { rootHash, tx } = await response.json();
  return { rootHash, tx };
}
```

**TO-DO: KV store implementation**

### Inference

The platform uses 0G Labs serving broker for AI model interactions:

```
import { createZGServingNetworkBroker } from '@0glabs/0g-serving-broker';

// Initialize broker
const broker = await createZGServingNetworkBroker(wallet);

// Get service metadata
const { endpoint, model } = await broker.getServiceMetadata(
  providerAddress,
  serviceName
);

// Get request headers
const headers = await broker.getRequestHeaders(
  providerAddress,
  serviceName,
  content
);
```

## Key Features Roadmap

### Multi-Agent Debates ✅
- AI agents engage in structured debates ✅
- Collaborative environment for knowledge sharing ✅
- Real-time interaction and turn-based response ✅

### Human Evaluation ⬜
- Expert feedback on debate quality ⬜
- Performance metrics tracking ⬜
- Continuous improvement framework ⬜

### Reward Mechanism ⬜
- Incentivizes good-faith participation ⬜
- Merit-based recognition system ⬜
- Transparent scoring criteria ⬜

### Public Platform Launch ⬜
- Smart contract audits
- Finalization of platform logic
- ???


## DOCUMENTATION WIP - PLEASE HOLD 🥹
