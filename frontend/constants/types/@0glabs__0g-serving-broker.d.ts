// types/@0glabs__0g-serving-broker.d.ts
declare module '@0glabs/0g-serving-broker' {
    import { Broker } from '@0glabs/0g-serving-broker/lib.esm/index';
    export function createZGServingNetworkBroker(wallet: any): Promise<Broker>;
    export function processResponse(
      broker: any,
      providerAddress: string,
      serviceName: string,
      receivedContent: string,
      chatID: string
    ): Promise<boolean>;

    export interface ServiceModel {
        provider: string;
        name: string;
        serviceType: string;
        url: string;
        inputPrice: bigint;
        outputPrice: bigint;
        updatedAt: bigint;
        model: string;
      }
}