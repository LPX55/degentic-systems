// app/api/chat/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ethers } from 'ethers';
import { createZGServingNetworkBroker, type ZGServingNetworkBroker, type ServiceStructOutput } from '@0glabs/0g-serving-broker';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.NEXT_PUBLIC_FUNDER_PRIVATE_KEY || "";
const SERVICE_NAME = "llama8Bb";
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

export async function GET(req: NextRequest) {
  if (!broker || !service) {
    await init0g();
  }

  const providerAddress = service.provider;
  console.log("Processing a request...");
  const serviceName = service.name;
  const systemPrompt = req.nextUrl.searchParams.get('i') || "You are a helpful assistant, respond to the best of your ability.";
  const content = `### INSTRUCTIONS: ${systemPrompt}\n\n### RESPOND TO THE FOLLOWING: ${req.nextUrl.searchParams.get('q') || "Who is Satoshi Nakamoto?"}`;

  const { endpoint, model } = await broker.getServiceMetadata(providerAddress, serviceName);
  console.log("fetching headers");
  const headers = await broker.getRequestHeaders(providerAddress, serviceName, content);

  openai = new OpenAI({ baseURL: endpoint, apiKey: "" });
  let completion = undefined;

  try {
    completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: content,
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
            content: content,
          }
        ],
        model: model,
      }, {
        headers: { ...headers },
      });
    }
  }

  if (completion === undefined || completion.choices === undefined) {
    const errorMessage = completion?.object || "Provider error.";
    return new NextResponse(errorMessage, { status: 500 });
  }

  const receivedContent = completion.choices[0].message.content;
  const chatID = completion.id;

  if (!receivedContent) {
    throw new Error("No content received.");
  }

  console.log("Response:", receivedContent);
  console.log("Processing a response...");
  const isValid = await broker.processResponse(providerAddress, serviceName, receivedContent, chatID);
  console.log(`Response validity: ${isValid ? "Valid" : "Invalid"}`);
  console.log("data from response", receivedContent);

  return new NextResponse(receivedContent, { status: 200 });
}