require("@nomicfoundation/hardhat-toolbox");
require("./tasks/generate-deployer");
require("./tasks/get-private-key");
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const {extendEnvironment, subtask, extendConfig} = require('hardhat/config');
const prompt = require('prompt-sync')({sigint: true});
const chalk = require("chalk");
const { clearLastLine, clearLines } = require("./utils/lineManipulation");
const { task } = require("hardhat/config");
const execSync = require('child_process').execSync;
/** @type import('hardhat/config').HardhatUserConfig */

const gasAmount = 427000;

extendEnvironment((hre) => {
  let networks = hre.config.superchain.networks;
  let deployer = hre.config.superchain.deployerAccount;

  for(let i=0; i < networks.length; i++) {
    hre.config.networks[networks[i]].accounts = [deployer]
  }

});


task("fund-deployer", "Fund the deployer account with native tokens")
  .addParam("contractName", "Name of the contract to be deployed")
  // .addOptionalVariadicPositionalParam(
  //   "constructorArgs", 
  //   "Constructor arguements of the contract"
  // )
  .setAction(async (args, hre) => {
    try {
      let networks = hre.config.superchain.networks;
      let deployer = new hre.ethers.Wallet(hre.config.superchain.deployerAccount);
      let funder = new hre.ethers.Wallet(hre.config.superchain.funderAccount);

      // Calculate gas for deployment
      let contract = await hre.ethers.getContractFactory(args.contractName);
      // let data = (await contract.getDeployTransaction(...args.constructorArgs));

      // const estimatedGas = await ethers.provider.estimateGas({ data: data });

      console.log(chalk.bold("Funding the deployer account\n"));

      for(let i=0; i < networks.length ; i++) {

        console.log(chalk.bold("-->Checking for balances on network "), chalk.bold.green(networks[i]));

        let provider = new hre.ethers.JsonRpcProvider(hre.config.networks[networks[i]].url);
        console.log("\n")
        console.log("Connected to proivder");
        let deployerBalance = hre.ethers.utils.formatEther(await provider.getBalance(deployer.address));
        let funderBalance = hre.ethers.utils.formatEther(await provider.getBalance(funder.address));


        let feeData = await provider.getFeeData();

        let maxGas = feeData.maxFeePerGas;
        let tip = feeData.maxPriorityFeePerGas;

        let gas = maxGas + tip;

        console.log(chalk.bold.green("Gas price:  ", gas.toString()));

        let fundToSend = hre.ethers.formatUnits(30000000, 'gwei').toString();

        console.log(chalk.bold("Required amount of native tokens to deploy contract:  "), chalk.bold.green(fundToSend));

        if(deployerBalance >= fundToSend) {
          console.log("Balance for deployer address: ", chalk.bold(deployer.address), " ", chalk.bold.green(deployerBalance));

          console.log(chalk.bold.green("Deployer has enough amount of tokens passing to next network\n"));
        } else {
          console.log("Balance for deployer address: ", chalk.bold(deployer.address), " ", chalk.bold.red(deployerBalance));

          console.log("Balance for funder address:  ", chalk.bold(funder.address), " ", chalk.bold.green(funderBalance),"\n");

          let ifFund = prompt("Fund the deployer address (press Y and enter to continue)  ");

          if(ifFund.toLowerCase() === "y") {
            // fund the address
            let funderConnected = funder.connect(provider);

            let tx = {
              to: deployer.address,
              value: hre.ethers.utils.parseEther(fundToSend.toString())
            }

            let res = await funderConnected.sendTransaction(tx);

            console.log("Tx hash to fund deployer ", chalk.bold(res.hash), "on network  ", chalk.bold.green(networks[i]));

            console.log(chalk.bold.green("Tx sent for funding the deployer passing to next network\n"));
          }
        }
      }

      console.log(chalk.bold.green("Funding phase is completed continue with deploying"));
    } catch(err) {
      console.log(err);
      return;
    }
  }
);

task("check-balances", "Check balances of deployer and funder on wanted chains")
  .setAction(async (args, hre) => {
    try {
      let networks = hre.config.superchain.networks;
      let deployer = new hre.ethers.Wallet(hre.config.superchain.deployerAccount);
      let funder = new hre.ethers.Wallet(hre.config.superchain.funderAccount);

      let funded = true;

      console.log(chalk.bold("Checking balances\n"));

      for(let i=0; i < networks.length ; i++) {

        console.log(chalk.bold("-->Checking for balances on network "), chalk.bold.green(networks[i]));

        let provider = new hre.ethers.JsonRpcProvider(hre.config.networks[networks[i]].url);

        let deployerBalance = hre.ethers.formatEther(await provider.getBalance(deployer.address));
        let funderBalance = hre.ethers.formatEther(await provider.getBalance(funder.address));

        let gas = await provider.getFeeData().gasPrice;
        
        let fundToSend = hre.ethers.formatUnits(10000000, 'gwei').toString();

        console.log("Balance for deployer address: ", chalk.bold(deployer.address), " ", chalk.bold.blue(deployerBalance));

        console.log("Balance for funder address:  ", chalk.bold(funder.address), " ", chalk.bold.green(funderBalance),"\n");

        console.log(chalk.bold("Required amount of native tokens to deploy contract:  "), chalk.bold.green(fundToSend));

        if(deployerBalance >= fundToSend) {
          console.log(chalk.bold.green("Deployer has enough amount of funds"));
        } else {
          console.log(chalk.bold.red("Deployer does not have enough amount of tokens, fund it!\n\n"));
          funded = false;
        }
      }

      return funded;
    } catch(err) {
      console.log(err);
      return false;
    }
  });

task("superchain-deploy", "Deploy smart contracts to superchain")
  .addParam("path", "Path to deploy script")
  .setAction(async (args, hre) => {
    // let balancesRes = await hre.run("check-balances");

    // if(!balancesRes) {
    //   return;
    // }

    console.log(chalk.bold("-->Deployment phase"));

    let networks = hre.config.superchain.networks;

    for(let i=0; i < networks.length; i++) {
      console.log("Deploying for network: ", chalk.bold.green(networks[i]));
      console.log("Deployment script logs");
      console.log("-->");
      console.log("-->\n\n");
      hre.hardhatArguments.network = networks[i];
      await hre.run("run", { script: args.path });

      console.log("\n\n");
      console.log(chalk.bold.green("Deployed successfully to ", networks[i]));
      console.log(chalk.bold.green("\nPassing to next network"));
    }
    
  })

task("superchain-verify", "Verify contracts on deployed networks")
  .addParam("address", "Address of the deployed contract")
  .addOptionalVariadicPositionalParam("constructorArgs", "Constructor arguments of the contract")
  .setAction(async (args, hre) => {
    let networks = hre.config.superchain.networks;

    for(let i=0; i < networks.length; i++) {
      console.log("Verifying for network: ", chalk.bold.green(networks[i]));
      console.log("-->");
      console.log("-->\n\n");
      hre.hardhatArguments.network = networks[i];

      // Only append constructor args to command if they exist
      const verifyCommand = `npx hardhat verify --network ${networks[i]} ${args.address}${
        args.constructorArgs ? ' ' + args.constructorArgs.join(' ') : ''
      }`;
      console.log(verifyCommand);

      let res = execSync(verifyCommand);
      var enc = new TextDecoder("utf-8");

      console.log(enc.decode(res));

      console.log("\n\n");
    }
  });

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    },
    optimisticSepolia: {
      url: process.env.OPTIMISM_SEPOLIA_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    },
    uniChainSepolia: {  
      url: process.env.UNICHAIN_SEPOLIA_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    },
    worldChainSepolia: {  
      url: process.env.WORLD_CHAIN_SEPOLIA_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    },
    zeroGTestnet: {
      url: process.env.ZERO_G_TESTNET_RPC_URL,
      gasPrice: "auto",
      gas: "auto"
    }
  },
  superchain: {
    networks: ["zeroGTestnet", "sepolia", "optimisticSepolia", "baseSepolia", "uniChainSepolia", "worldChainSepolia"],
    deployerAccount: process.env.DEPLOYER_ACCOUNT,
    funderAccount: process.env.FUNDER_ACCOUNT
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.SEPOLIA_API,
      optimisticSepolia: process.env.OPTIMISM_API,
      baseSepolia: process.env.BASE_API,
      uniChainSepolia: process.env.UNICHAIN_API,
      worldChainSepolia: process.env.WORLD_CHAIN_API
    }
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
