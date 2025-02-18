import { signTX } from "./sign.js";
import axios from "axios";
import { readFileSync } from "fs";

// Constants
const config = JSON.parse(readFileSync("./config.json", "utf-8"));
const API_BASE_URL = config.url;
const AUTH_TOKEN = config.token;
const STAKER_ADDRESS = "0x338EF19fA2eC0fc4d1277B1307a613fA1FBbc0cb";

// Authorization headers helper
function getAuthorizationHeaders() {
  return {
    accept: "application/json",
    authorization: AUTH_TOKEN,
    "content-type": "application/json",
  };
}

// step1: Create Eigen Pod Address

async function initiateEigenPodRequest() {
  const url = `${API_BASE_URL}/eigenlayer/tx/create-pod`;
  const data = {};

  try {
    const response = await axios.post(url, data, {
      headers: getAuthorizationHeaders(),
    });
    console.log("Unsigned Transaction Response:", response.data);
    return response.data.result.serializeTx;
  } catch (error) {
    console.error(
      "Error initiating staking request:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function initiateCreateRestakeRequest() {
  const url = `${API_BASE_URL}/eigenlayer/tx/create-pod`;
  const data = {
    id: "761db76f-d6d8-4da8-8cc8-2c87ef56c1a9",
    type: "RESTAKING",
    validatorsCount: 1,
    eigenPodOwnerAddress: STAKER_ADDRESS,
    feeRecipientAddress: STAKER_ADDRESS,
    controllerAddress: STAKER_ADDRESS,
    nodesOptions: {
      location: "any",
      relaysSet: null,
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: getAuthorizationHeaders(),
    });
    console.log("Unsigned Transaction Response:", response.data);
    return response.data.result;
  } catch (error) {
    console.error(
      "Error initiating staking request:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function broadcastTx(txHex) {
  const url = `${API_BASE_URL}/transaction/send`;
  const data = {
    transactionHex: txHex,
    maxFee: 1000000,
  };

  try {
    const response = await axios.post(url, data, {
      headers: getAuthorizationHeaders(),
    });
    console.log("Tx Hash:", response.data.result.transactionHash);
    return response.data.result.transactionHash;
  } catch (error) {
    console.error(
      "Error broadcasting transaction:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Main function to handle request, signing, and broadcasting
(async function main() {
  try {
    // step 2: Create Stake Transaction
    const txHex = await initiateRequest();

    // step 3: Sign and Broadcast Transaction
    if (txHex && txHex.stakeTransactionHex) {
      const signedTx = signTX(txHex.stakeTransactionHex);
      console.log("Final Signed Transaction:", signedTx);

      // if (signedTx) {
      //   const txHash = await broadcastTx(signedTx); // Await broadcastTx
      //   console.log("Broadcasted Transaction Hash:", txHash);
      // }
    } else {
      console.error("Error: stakeTransactionHex not found in response");
    }
  } catch (error) {
    console.error(
      "Failed to initiate, sign, and broadcast transaction:",
      error.message
    );
  }
})();
