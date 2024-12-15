import { getBroker } from '@/lib/broker';
import OpenAI from "openai";

async function sendModelRequest(
  broker: any,
  providerAddress: string,
  serviceName: string,
  content: string
) {
  const { endpoint, model } = await broker.getServiceMetadata(
    providerAddress,
    serviceName
  );

  const headers = await broker.getRequestHeaders(
    providerAddress,
    serviceName,
    content
  );

  const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: "",
  });

  const completion = await openai.chat.completions.create(
    {
      messages: [{ role: "system", content }],
      model: model,
    },
    {
      headers: {
        ...headers,
      },
    }
  );

  return completion;
}

export async function POST(request: Request) {
  const { providerAddress, serviceName, content } = await request.json();
  const broker = await getBroker();
  
  const completion = await sendModelRequest(
    broker,
    providerAddress,
    serviceName,
    content
  );

  return new Response(JSON.stringify(completion), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 