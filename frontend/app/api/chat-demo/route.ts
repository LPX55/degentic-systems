import type {DemoChatOpenAITextRequestBody} from '@/lib/types/chat-request';
import type {OpenAIConverseResult} from '@/lib/types/openai-results';
import {createReqChatBody} from '@/lib/types/openai-body';
import errorHandler from '@/lib/utils/error-handler';
import {type NextRequest, NextResponse} from 'next/server';
import { createZGServingNetworkBroker, type ZGServingNetworkBroker, type ServiceStructOutput } from '@0glabs/0g-serving-broker';
import { OpenAI } from 'openai';
import { ethers } from 'ethers';

import dotenv from 'dotenv';

dotenv.config();


const PRIVATE_KEY = process.env.NEXT_PUBLIC_FUNDER_PRIVATE_KEY || "";
const SERVICE_NAME = "chat-provider-1";
let openai = new OpenAI({ apiKey: "" });
let broker: ZGServingNetworkBroker;
let service: ServiceStructOutput;
let cachedServices: { services: ServiceStructOutput[]; timestamp: number } | null = null; // Cache Services List
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // WARNING: MIGHT NOT BE A GOOD IDEA FOR PRODUCTION ENVIORNMENTS

async function init0g() {
  const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  try {
    broker = await createZGServingNetworkBroker(wallet);
    console.log("Listing available services...");

    const currentTime = Date.now(); 
    if (!cachedServices || (currentTime - cachedServices.timestamp) > CACHE_EXPIRATION_TIME) {
      cachedServices = {
        services: await broker.listService(), // Fetch and cache services
        timestamp: currentTime, // Store the current time
      };
    }

    for (const service of cachedServices.services) { // Using cached services only for testnet dev purposes
      console.log(`Service: ${service.name}, Provider: ${service.provider}, Type: ${service.serviceType}, Model: ${service.model}, URL: ${service.url}`);
    }

    const foundService = cachedServices.services.find((service: ServiceStructOutput) => service.name === SERVICE_NAME);
    if (!foundService) {
      console.error("Service not found.");
      return;
    }
    service = foundService;
    const providerAddress = service.provider;

    let account = null;
    try {
      account = await broker.getAccount(providerAddress);
      console.log(account);
    } catch (error) {
      console.error("Error fetching account:", error);
    }

    if (!account) {
      const initialBalance = 0.00000001;
      // Only needed for the first time
      try {
        console.log("Creating a new account...");
        await broker.addAccount(providerAddress, initialBalance);
        console.log("Account created successfully.");
        account = await broker.getAccount(providerAddress); // Fetch the account again after creation
        console.log(account);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Error during execution:", error);
  }
}

async function handler(req: NextRequest) {
    if (!broker || !service) {
        await init0g();
      }
  const textRequestBody = (await req.json()) as DemoChatOpenAITextRequestBody;
  console.log(textRequestBody);

  const chatBody = createReqChatBody(textRequestBody);
  const userMessage = chatBody.messages[0]?.content;

  if (typeof userMessage !== 'string') {
    console.error("Invalid content type:", userMessage);
    return NextResponse.json({ error: "Invalid message content" }, { status: 400 });
  }

  console.log("Processing a request...");
  const providerAddress = service.provider;
  console.log("Processing a request...");
  const serviceName = service.name;
  const { endpoint, model } = await broker.getServiceMetadata(providerAddress, serviceName);
  console.log("fetching headers");
  const headers = await broker.getRequestHeaders(providerAddress, serviceName, chatBody);

  openai = new OpenAI({ baseURL: endpoint, apiKey: "" });
  let completion = undefined;

  try {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage || "",
        }
      ],
      model: model,
    }, {
      headers: { ...headers },
    });
  } catch (error: any) {
    const regex = /(?<=expected\s)([0-9.]+)/;
    const match = error.error.match(regex);
    if (match) {
      const feeToPay: number = Number(match[1]);
      console.log(`need to settle ${feeToPay} A0GI`);
      try {
        await broker.settleFee(providerAddress, serviceName, feeToPay);
        console.log("fee settled!");
      } catch (error) {
        console.log("unable to settle fee", error);
      }
    }
  } finally {
    console.log("finally", completion);
    if (completion === undefined) {
      completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: userMessage || "",
          }
        ],
        model: model,
      }, {
        headers: { ...headers },
      });
    }
  }


  // Sends response back to Deep Chat using the Response format:
  // https://deepchat.dev/docs/connect/#Response
  return NextResponse.json({text: completion.choices[0].message?.content || ''});
}

export const POST = errorHandler(handler);