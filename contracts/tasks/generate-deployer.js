const chalk = require("chalk");
const prompt = require('prompt-sync')({sigint: true});
const { clearLastLine, clearLines } = require("../utils/lineManipulation");
const fs = require('fs');

task("generate-deployer", async (args, hre) => {
    console.log(chalk.blue('Generating a deployer wallet!\n'));
    let deployer = hre.ethers.Wallet.createRandom();
  
    console.log(chalk.white.bgRed.bold(deployer.mnemonic.phrase), "\n");
    console.log("Take this 12 word phrase in a secure place and enter a password!\n");
  
    console.log("Copy the private key into hardhat.config to be used!");
    console.log(chalk.white.bgRed.bold(deployer.privateKey))
    console.log(chalk.bold("After you enter a password phrase will be deleted !"));
  
    let pressEnter =prompt("Did you save it the phrase (press Enter)    ");
    clearLastLine()
  
    let password = prompt("Enter a password: ");
    clearLines(9);
  
    let encryptedWallet = await deployer.encrypt(password);
  
    console.log(chalk.bold("Deployer wallet in encrypted it will be saved!"));
  
    let name = prompt("Give a name to deployer: ");
  
    // here should check if such name exists and not write to file on top of it
    // this might delete wallets, which is not a wanted functionality
  
    fs.writeFile(`./wallets/${name}.json`, encryptedWallet, 'utf8', () => {
      console.log(chalk.bold("Deployer wallet generated successfully!"));
    });
  });