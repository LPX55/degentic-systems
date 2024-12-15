import { getBroker } from '@/lib/broker';

async function handleResponseProcessing(
  broker: any,
  providerAddress: string,
  serviceName: string,
  receivedContent: string,
  chatID: string
) {
  const isValid = await broker.processResponse(
    providerAddress,
    serviceName,
    receivedContent,
    chatID
  );

  return isValid;
}

export async function POST(request: Request) {
  const { providerAddress, serviceName, receivedContent, chatID } = await request.json();
  const broker = await getBroker();

  const isValid = await handleResponseProcessing(
    broker,
    providerAddress,
    serviceName,
    receivedContent,
    chatID
  );

  return new Response(JSON.stringify({ isValid }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 