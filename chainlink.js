// chainlink.js
import { stake } from "./stake.js";
import { ethers } from "ethers"; // Use ethers.js to interact with Ethereum

// Replace with your contract address and ABI
const contractAddress = "0xYourContractAddress";
const contractABI = [
    // Replace with your contract's ABI
    "event ETHDiverted(address indexed sender, uint256 ethAmount)",
];

// Replace with your wallet address and provider (e.g., Infura, Alchemy)
const walletAddress = "0xYourWalletAddress";
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Function to check wallet balance
async function checkWalletBalance() {
    try {
        const balance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(balance); // Convert balance from Wei to ETH
        console.log(`Wallet balance: ${balanceInEth} ETH`);

        // Check if balance is >= 32 ETH
        if (parseFloat(balanceInEth) >= 32) {
            console.log("Wallet has 32 ETH or more. Calling stake()...");
            await stake(); // Call the stake function
        } else {
            console.log("Wallet does not have 32 ETH yet.");
        }
    } catch (error) {
        console.error("Error checking wallet balance:", error.message);
    }
}

// Listen for ETHDiverted event
contract.on("ETHDiverted", (sender, ethAmount) => {
    console.log(`ETHDiverted event detected. Sender: ${sender}, Amount: ${ethers.utils.formatEther(ethAmount)} ETH`);
    checkWalletBalance(); // Check balance when event is emitted
});

// Initial balance check
checkWalletBalance();