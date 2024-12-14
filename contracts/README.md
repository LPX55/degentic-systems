## Introduction

This is a hardhat project for deploying deterministic contracts to the OP Superchain testnets. 

## 0G.ai Deployment

0g.ai was added to the list of testnet chains, although not officially a member of the Superchain. 

The CCIP powered offchain resolver contracts in this repo will be deployed to the 0G testnet along with the respective ENS and registrar contracts to allow for the minting and resolution of names on 0G for easier to read domain-like names for contracts and addresses on 0G, allowing for storage nodes and service providers to be more easily identified. 

## Deployment Addresses

| Network                | Address                                                       |
|-----------------------|--------------------------------------------------------------|
| 0G Testnet            | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |
| Sepolia               | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |
| Optimistic Sepolia    | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |
| Base Sepolia          | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |
| UniChain Sepolia      | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |
| World Chain Sepolia   | 0x8d6a03d040733087c0503de51762886e9f63ff67                 |

## Getting Started

```bash
npx hardhat
```

## Utility Tasks

### Generate Deployer

```bash
npx hardhat generate-deployer
```

### Get Private Key

```bash
npx hardhat get-private-key --account ./wallets/deployer.json
```

### Fund Deployer

```bash
npx hardhat fund-deployer --contract OffchainResolverFactory
```

### Deploy Contracts

```bash
npx hardhat deploy
```

## Awknowledgements

This hardhat contract deployment flow takes heavy inspiration from [Onuruci's hardhat-superchain-deploy project.](https://github.com/onuruci/hardhat-superchain-deploy/)

