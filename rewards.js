// code to check and claim rewards

async function checkP2PRewards(stakerAddress) {
    const url = `${API_BASE_URL}eth/staking/eigenlayer/p2p-rewards`;
    const data = { ownerAddress: stakerAddress };

    try {
        const response = await axios.post(url, data, {
            headers: getAuthorizationHeaders(),
        });
        console.log("P2P Rewards Response:", response.data);
        return response.data.result;
    } catch (error) {
        console.error(
            "Error fetching P2P rewards:",
            error.response?.data || error.message
        );
        throw error;
    }
}

// Call the function to check rewards
checkP2PRewards(STAKER_ADDRESS).then((rewards) => {
    console.log("Your P2P Rewards:", rewards);
});

async function claimP2PRewards(stakerAddress) {
    const url = `${API_BASE_URL}eth/staking/eigenlayer/claim-p2p-rewards`;
    const data = { ownerAddress: stakerAddress };

    try {
        const response = await axios.post(url, data, {
            headers: getAuthorizationHeaders(),
        });
        console.log("Claim P2P Rewards Response:", response.data);
        return response.data.result;
    } catch (error) {
        console.error(
            "Error claiming P2P rewards:",
            error.response?.data || error.message
        );
        throw error;
    }
}

// Call the function to claim rewards
claimP2PRewards(STAKER_ADDRESS).then((result) => {
    console.log("Rewards Claim Transaction:", result);
});

async function claimAndBroadcastP2PRewards() {
    try {
        console.log("Claiming P2P rewards...");
        const claimTx = await claimP2PRewards(STAKER_ADDRESS);

        console.log("Signing and Broadcasting Claim Transaction...");
        const signedClaimTx = await signAndBroadcast(
            claimTx.serializeTx,
            claimTx.gasLimit,
            claimTx.maxFeePerGas,
            claimTx.maxPriorityFeePerGas,
            claimTx.value
        );

        console.log("P2P Rewards Claim Transaction Broadcasted:", signedClaimTx.hash);
    } catch (error) {
        console.error("P2P Rewards Claim failed:", error.message);
    }
}

// Execute the function
claimAndBroadcastP2PRewards();

