import { ZgFile, Indexer, getFlowContract } from '@0glabs/0g-ts-sdk';
import { getWallet } from './wallet';
import { BrowserFile } from './browserFile';
import { ethers, JsonRpcProvider } from 'ethers';
import { FileHandle } from 'node:fs/promises';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { put } from '@vercel/blob';

const turbo = true;
const indRpc = process.env.NEXT_PUBLIC_INDEXER_URL || "";
const flowTurboAddr = "0xbD2C3F0E65eDF5582141C35969d66e34629cC768"; 
const flowAddr = turbo ? flowTurboAddr : "0x0460aA47b41a66694c0a73f667a1b795A5ED3556";

let storageInstance: any = null;

/**
 * Initializes and returns a singleton storage client instance.
 */
export async function storageParams() {
  if (!storageInstance) {
    // Check if we're in the browser
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const flowContract = getFlowContract(flowAddr, signer);
      const indexer = new Indexer(indRpc);
      storageInstance = { flowContract, indexer };
    } else {
      // Fallback for server-side
      const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_EVM_RPC);
      const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_FUNDER_PRIVATE_KEY || '', provider);
      const flowContract = getFlowContract(flowAddr, signer);
      const indexer = new Indexer(indRpc);
      storageInstance = { flowContract, indexer, signer };
    }
  }
  return storageInstance;
}

/**
 * Gets the root hash of a file from its file path.
 */
export async function getFileRootHash(filePath: string) {
  const file = await ZgFile.fromFilePath(filePath);
  const [tree, err] = await file.merkleTree();
  if (err) {
    console.error("Error getting file root hash: ", err);
    return null;
  } else {
    console.log("File Root Hash: ", tree?.rootHash());
    await file.close();
    return tree?.rootHash();
  }
}

/**
 * Uploads data to Vercel Blob Storage, then 0G storage.
 */
export async function uploadData(file: File) {
  try {
    const client = await storageParams();
    const evmRpc = process.env.NEXT_PUBLIC_EVM_RPC || 'https://evmrpc-testnet.0g.ai';

    // Upload file to Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.DEGENTIC_READ_WRITE_TOKEN,
    });

    // Create a temporary file path
    const tempFilePath = path.join(os.tmpdir(), file.name);

    // Download the blob to the temporary file path
    const response = await fetch(blob.url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(tempFilePath, buffer);

    // Create ZgFile from the temporary file path
    const zgFile = await ZgFile.fromFilePath(tempFilePath);
    console.log("fileSize", zgFile.size());

    const [tree, treeErr] = await zgFile.merkleTree();
    if (treeErr) {
      console.error("Error getting merkle tree:", treeErr);
      return { error: treeErr };
    }

    const rootHash = tree?.rootHash();
    console.log("Root hash:", rootHash);

    let tx;
    let err;
    try {
      [tx, err] = await client.indexer.upload(zgFile, 0, evmRpc, client.signer, flowAddr);
      if (err) {
        console.error("Error uploading file:", err);
        return { error: err };
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'UNSUPPORTED_OPERATION') {
        console.error("Upload failed due to unsupported operation:", error);
        return { error: 'Upload failed due to unsupported operation. Please check your contract runner configuration.' };
      }
      throw error;
    } finally {
      // Close the ZgFile and remove the temporary file
      await zgFile.close();
      fs.unlinkSync(tempFilePath);
    }

    return { rootHash: rootHash, tx: tx };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: error };
  }
}

/**
 * Downloads data from 0G storage.
 */
export async function downloadData(rootHash: string, outputPath: string, withProof: boolean) {
  const client = await storageParams();
  
  // Assuming the download method is available in the indexer
  const err = await client.indexer.download(rootHash, outputPath, withProof);
  
  if (err) {
    throw new Error(`Error downloading file: ${err}`);
  }
  
  return { message: 'File downloaded successfully' };
}

/**
 * Lists all stored data.
 */
export async function listStoredData(pageSize: number = 10, pageNumber: number = 1) {
  const client = await storageParams();
  const result = await client.indexer.list({
    pageSize,
    pageNumber,
  });
  return result;
}

/**
 * Gets storage status.
 */
export async function getStorageStatus() {
  const client = await storageParams();
  const result = await client.indexer.status();
  return result;
}
