const chalk = require("chalk");
const prompt = require('prompt-sync')({sigint: true});
const { clearLastLine, clearLines } = require("../utils/lineManipulation");
const fs = require('fs');

task("get-private-key", "Get private key of account")
  .addParam("account", "Path to account json file")
  .setAction(async (args, hre) => {

    console.log(chalk.bold("Get private key of account\n"));

    let password = prompt("Password of account: ");

    let wallet_json = fs.readFileSync( args.account);

    let wallet = hre.ethers.Wallet.fromEncryptedJsonSync(wallet_json, password);

    console.log(chalk.bold.bgRed(wallet.privateKey));

    let pressEnter =prompt("Did you save it the private key (press Enter to continue and delete logs)    ");
    clearLines(3);

    console.log(chalk.bold.green("Task completed successfully"));
    
});
