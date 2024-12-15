import { getBroker } from '@/lib/broker';

async function fetchServices(broker: any) {
  const services = await broker.listService();
  return services;
}
function serialize(data: any) {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
  }));
}

export async function GET(request: Request) {
  const broker = await getBroker();
  const services = await fetchServices(broker);
  const serializedServices = serialize(services);

  return new Response(JSON.stringify(serializedServices), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 