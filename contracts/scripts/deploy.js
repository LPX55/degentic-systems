// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  try {
    console.log("Starting deployment process...");
    console.log(`Network: ${hre.network.name}`);

    let provider = new hre.ethers.JsonRpcProvider(hre.network.config.url);
    let feeData = await provider.getFeeData();
    
    // In v6, we can use the feeData directly without additional calculations
    const deploymentOptions = {
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    };
    
    // Deploy OffchainResolverFactory
    console.log("Deploying OffchainResolverFactory...");
    const implementationContract = await hre.ethers.deployContract(
      "OffchainResolver"
    );
    await implementationContract.waitForDeployment();

    const factory = await hre.ethers.deployContract(
      "OffchainResolverFactory",
      [await implementationContract.getAddress()], // Pass the implementation address
      {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
      }
    );
    await factory.waitForDeployment();
    
    // Log deployment information - Updated property access
    console.log("\nDeployment Summary:");
    console.log("--------------------");
    console.log(`OffchainResolverFactory deployed to: ${await factory.getAddress()}`);
    console.log(`Implementation Address (constructor arg): ${await implementationContract.getAddress()}`);
    console.log(`Transaction hash: ${factory.deploymentTransaction().hash}`);
    
    // Get receipt using v6 syntax
    const receipt = await factory.deploymentTransaction().wait();
    console.log(`Gas used: ${receipt.gasUsed}`);
    
    // Verify contract if not on localhost
    if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
      console.log("\nVerifying contract on Etherscan...");
      await hre.run("verify:verify", {
        address: await factory.getAddress(),
        constructorArguments: [await implementationContract.getAddress()],
      });
    }

    console.log("\nDeployment completed successfully!");
    
  } catch (error) {
    console.error("\nDeployment failed!");
    console.error(error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Fatal error during deployment:");
  console.error(error);
  process.exitCode = 1;
});