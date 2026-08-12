const { ethers } = require("ethers");
const fs = require("fs");

// Read existing wallet from wallet.json
const walletData = JSON.parse(
    fs.readFileSync("./wallet.json", "utf8")
);

// Connect to blockchain
const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");

// Connect existing wallet using private key
const wallet = new ethers.Wallet(
    walletData.privateKey,
    provider
);

// Receiver's wallet address
const receiver = "0xa7704bA93fE0A8e04E6E8Bfd760b0892ac71a319";

// Transaction function
async function sendTransaction() {

    const transaction = {
        to: receiver,
        value: ethers.parseEther("0.001"), // Amount to send (in Ether)
    };

    // Send transaction
    const tx = await wallet.sendTransaction(transaction);

    console.log("Transaction Hash:", tx.hash);

    // Wait for confirmation
    await tx.wait();

    console.log("Transaction Completed");
}

sendTransaction();