"use client";

import { client } from "@/lib/client";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "@/server/actions/auth";
import {
    inAppWallet,
    InAppWalletConnectionOptions,
    createWallet,
  } from "thirdweb/wallets";
  import { createThirdwebClient, defineChain } from "thirdweb";
import { ConnectButton, darkTheme, useChainMetadata } from "thirdweb/react";

const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "telegram", "x"],
      },
    }),
    createWallet("io.metamask"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

export function AuthButton() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
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
      auth={{
        // The following methods run on the server (not client)!
        isLoggedIn: async () => {
          const authResult = await isLoggedIn();
          if (!authResult) return false;
          return true;
        },
        doLogin: async (params) => await login(params),
        getLoginPayload: async ({ address }) =>
          generatePayload({ address }),
        doLogout: async () => await logout(),
      }}
    />
  );
}