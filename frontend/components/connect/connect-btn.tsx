import { createThirdwebClient, defineChain } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme, 
  useSocialProfiles,
  useActiveAccount, } from "thirdweb/react";
import {
  inAppWallet,
  InAppWalletConnectionOptions,
  createWallet,
} from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
});

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "github", "x"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("global.safe"),
  createWallet("walletConnect"),

];
  // const { data: chainMetadata } = useChainMetadata(defineChain(16600));
export function TW() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectButton={{ label: "Connect" }}
      theme={darkTheme({
        colors: {
          modalBg: "hsl(0, 2%, 9%)",
          borderColor: "hsl(240, 8%, 10%)",
          accentText: "hsl(0, 0%, 35%)",
        },
      })}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
      accountAbstraction={{
        chain: defineChain(16600),
        sponsorGas: true,
      }}
    />
  );
}
