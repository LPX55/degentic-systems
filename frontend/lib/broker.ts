import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";
import { getWallet } from './wallet';

let brokerInstance: any = null;

/**
 * Initializes and returns a singleton broker instance.
 */
export async function getBroker(): Promise<any> {
  if (!brokerInstance) {
    const wallet = getWallet();
    brokerInstance = await createZGServingNetworkBroker(wallet);
  }
  return brokerInstance;
}
