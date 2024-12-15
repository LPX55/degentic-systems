import { ethers } from "ethers";

// TODO: Implement ERC4337 & State Management
export function getWallet() {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_EVM_RPC || 'https://evmrpc-testnet.0g.ai');
  const privateKey = process.env.FUNDER_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Wallet private key is not defined");
  }

  return new ethers.Wallet(privateKey, provider);
} 