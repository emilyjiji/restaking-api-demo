# restaking api demo

## Init Service

### Install Dependencies

```shell
yarn install
```

### Set Configuration

Update the `config.json` file with your private key, staking address, and API settings:

```json
{
  "privateKey": "YOUR_PRIVATE_KEY",
  "stakerAddress": "0xYOUR_ETH_ADDRESS",
  "url": "https://api-test-holesky.p2p.org/api/v1/",
  "rpc": "https://ethereum-holesky-rpc.publicnode.com",
  "token": "Bearer YOUR_API_TOKEN"
}
```

**Note:** Ensure your private key is correctly set, or the staking process will fail.

## Stake Your Ethereum Using the Restaking API

```shell
node stake.js
```
