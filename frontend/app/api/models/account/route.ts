import { getBroker } from '@/lib/broker';

export async function POST(request: Request) {
  const { providerAddress, initialBalance, depositAmount } = await request.json();

  const broker = await getBroker();

  await broker.addAccount(providerAddress, initialBalance);
  await broker.depositFund(providerAddress, depositAmount);
  const account = await broker.getAccount(providerAddress);

  return new Response(JSON.stringify(account), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
