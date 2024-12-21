import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID; 
const secretKey = process.env.AUTH_SECRET_KEY; 
const pkey = process.env.AUTH_ADMIN_PRIVATE_KEY;
export const client = createThirdwebClient({
    clientId: clientId || "",
    secretKey: secretKey || ""
  });
//   console.log(client);
//   console.log(pkey);
// const thirdwebAuth = createAuth({
//     domain: "localhost:3000", // your domain
//     client: client,
//     // your backend wallet to sign login payloads
//     adminAccount: privateKeyToAccount({ client, privateKey: pkey || "" }),
//   });