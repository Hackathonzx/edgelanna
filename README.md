# CrossChainLiquidityAggregator

# Project Overview

The CrossChainLiquidityAggregator aims to provide a seamless liquidity aggregation solution across multiple blockchain networks, optimizing decentralized finance (DeFi) lending rates and offering access to various liquidity pools. The aggregator uses Chainlink for routing and Pyth Stable Price Sources Oracle for determining interest rates, ensuring real-time and reliable data for decentralized credit scoring and rate optimization.

# Features
1. Cross-Chain Liquidity Aggregation: Aggregates liquidity from different blockchain networks, improving access to the best lending rates.
2. Real-Time Interest Rate Optimization: Uses the Pyth Stable Price Sources Oracle to dynamically fetch interest rates.
3. Decentralized Credit Scoring: Implements a decentralized mechanism for calculating user credit scores based on transaction history and lending behavior.
4. Chainlink Router: For cross-chain routing and seamless interactions between different blockchain networks.

# Tech Stack
- Smart Contracts: Solidity for contract development.
- Chainlink: For cross-chain communication and fetching interest rate data from Chainlink’s decentralized oracle network.
- Pyth Oracle: For fetching stable price data to calculate optimal lending rates.
- Cross-Chain Integration: Chainlink CCIP (Cross-Chain Interoperability Protocol) for seamless asset transfers across different blockchain ecosystems.

# Dependencies
- Solidity version: 0.8.0
- Chainlink Oracles
- Pyth Oracle for stable price feeds
- Chainlink Router

# Setup Instructions
**Clone the Repository**
- git clone https://github.com/Hackathonzx/chainflowapps.git
- cd CrossChainLiquidityAggregator

**Install Dependencies**

Ensure you have the required packages installed, including dependencies for Chainlink and Pyth Oracle sdk.
- npm install

# Deployment

Deploy the smart contracts using Hardhat

Ensure the proper Chainlink and Pyth addresses are configured in the deployment script.

Deploy the CrossChainLiquidityAggregator.sol contract.

- npx hardhat run ignition/modules/deploy.js --network UnichainSepoliaTestnet

Here is the deployed contract address:
- CrossChainLiquidityAggregator deployed to: 0x359451AC3C73827A7653C0Ab7D30243844a55447

# Verified contract



# Contract Details
1. CrossChainLiquidityAggregator.sol: The main contract that aggregates liquidity from multiple DeFi protocols and optimizes lending rates.
2. InterestRateOracle: Fetches current interest rates using Pyth Stable Price Sources Oracle.
3. Chainlink Router: Facilitates cross-chain interactions and asset transfers.

# Oracle Integration
1. Pyth Stable Price Sources Oracle:
This Oracle provides stable price feeds, which are used to fetch the interestRateOracleAddress for dynamic rate calculations.
2. Chainlink Router:
The router facilitates seamless liquidity aggregation and cross-chain transactions. It ensures that liquidity from multiple chains is aggregated effectively for users.


# How It Works
1. Liquidity Aggregation: Users can access the best rates by aggregating liquidity from various blockchain networks. The contract interacts with different DeFi platforms, fetching the highest available interest rates.

2. Interest Rate Optimization: By using Pyth Stable Price Sources Oracle, the contract fetches real-time stable prices to determine optimal lending rates, ensuring competitive rates for users.

3. Cross-Chain Transfers: The Chainlink CCIP enables cross-chain interoperability, allowing users to move assets seamlessly between supported blockchain networks.

4. Decentralized Credit Scoring: Based on user transaction history, the contract generates a credit score, allowing for better access to liquidity at competitive rates.

# How to Use

1. Lending: Provide liquidity to the aggregator and choose the best lending rates.
2. Borrowing: Borrow assets across different blockchain networks, taking advantage of optimal rates fetched by the aggregator.
3. Cross-Chain Transfers: Transfer assets between different blockchain networks using the Chainlink Router.

# Example Usage

Example usage of CrossChainLiquidityAggregator smart contract

const aggregator = await CrossChainLiquidityAggregator.deployed();

await aggregator.addLiquidity(amount, tokenAddress);

await aggregator.borrow(amount, targetBlockchain);

# Testing
Loan Issuance Test: Checks that loans are issued with correct details.

Loan Repayment Test: Calculates repayment amount and tests the repayment process.

Liquidity Management Test: Tests adding and removing liquidity, ensuring pool updates as expected.

# Contribution
Feel free to fork the repository and submit pull requests. Contributions are welcome, especially for improving the credit scoring system and cross-chain integration.

# License
This project is licensed under the MIT License.