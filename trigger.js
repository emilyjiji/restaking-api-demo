// trigger.js
import { stake } from "./stake.js";
import { ethers } from "ethers";
import { readFileSync } from "fs";

// Load config
const config = JSON.parse(readFileSync("./config.json", "utf-8"));
const walletAddress = config.stakerAddress;
const rpc = config.rpc;

// Set up the provider
const provider = new ethers.JsonRpcProvider(rpc);

// Check and trigger stake
async function checkAndStake() {
    try {
        const balance = await provider.getBalance(walletAddress);
        const balanceEth = ethers.formatEther(balance);
        console.log(`Wallet balance: ${balanceEth} ETH`);

        if (parseFloat(balanceEth) >= 32) {
            console.log("Wallet has enough ETH. Triggering stake...");
            await stake(provider); // pass in provider
        } else {
            console.log("Wallet does not have enough ETH yet.");
        }
    } catch (error) {
        console.error("Failed to check balance:", error.message);
    }
}

checkAndStake();
