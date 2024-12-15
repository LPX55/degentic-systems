// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ethers } from 'ethers';
import { createZGServingNetworkBroker, ZGServingNetworkBroker, ServiceStructOutput } from '@0glabs/0g-serving-broker';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.NEXT_PUBLIC_FUNDER_PRIVATE_KEY || "";
const SERVICE_NAME = "chat-provider-1";
let openai = new OpenAI({ apiKey: "" });
let broker: ZGServingNetworkBroker;
let service: ServiceStructOutput;

async function init0g() {
  const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  try {
    broker = await createZGServingNetworkBroker(wallet);
    console.log("Listing available services...");
    const services = await broker.listService();
    services.forEach((service: any) => {
      console.log(`Service: ${service.name}, Provider: ${service.provider}, Type: ${service.serviceType}, Model: ${service.model}, URL: ${service.url}`);
    });

    const foundService = services.find((service: any) => service.name === SERVICE_NAME);
    if (!foundService) {
      console.error("Service not found.");
      return;
    }
    service = foundService;
    const providerAddress = service.provider;

    const initialBalance = 0.00000001;
    try {
      console.log("Creating a new account...");
      await broker.addAccount(providerAddress, initialBalance);
      console.log("Account created successfully.");
    } catch (error) {
      console.log(error);
    }

    const account = await broker.getAccount(providerAddress);
    console.log(account);
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
  const content = req.nextUrl.searchParams.get('q') || "What is the capital of Germany?";

  const { endpoint, model } = await broker.getServiceMetadata(providerAddress, serviceName);
  console.log("fetching headers");
  const headers = await broker.getRequestHeaders(providerAddress, serviceName, content);

  openai = new OpenAI({ baseURL: endpoint, apiKey: "" });
  let completion = undefined;

  try {
    completion = await openai.chat.completions.create({
      messages: [{ role: "system", content }],
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
        messages: [{ role: "system", content }],
        model: model,
      }, {
        headers: { ...headers },
      });
    }
  }

  if (completion === undefined || completion.choices === undefined) {
    return new NextResponse("0g provider is having issues :(", { status: 500 });
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