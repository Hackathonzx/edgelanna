# Cross-Chain Skill Tokenization and Verification

# Overview

This project integrates SkillToken and CrossChainSkillVerification contracts to enable decentralized skill verification and token minting. The skill tokens are minted on one blockchain, and with the help of Chainlink oracles, the tokens can be verified and transferred across multiple blockchains. World ID integration ensures secure and private validation of skills.

# Features
1. Skill Token Minting: Mint unique skill tokens using verified proofs from World ID.
2. Cross-Chain Transfers: Transfer tokens across different blockchains with Oracle/Relayer verification.
3. World ID Integration: Securely verify skills with the World ID system.
4. Reputation and Endorsements: Visualize skill endorsements and user reputation.

# Smart Contracts
1. SkillToken.sol

ERC721-compliant token representing a skill endorsement.

**Functions:**

- mintSkillToken: Mint a skill token after World ID proof verification.
- setTokenURI: Set a URI for a token that describes the skill.
- tokenURI: Return the metadata URI for the token.

2. CrossChainSkillVerification.sol

Verifies skill tokens across blockchains using Chainlink oracles.

**Functions:**
- verifyAndTransferSkillToken: Verify the proof and trigger cross-chain token transfer.
- requestCrossChainTransfer: Request a cross-chain transfer for verified tokens.
- fulfillCrossChainTransfer: Handle the result of a cross-chain transfer request.

# Installation

Clone this repository:


git clone <repo_url>
cd <repo_folder>

Install dependencies:


npm install

Compile contracts:

npx hardhat compile
Deploy contracts: Modify the deploy.js script with the necessary parameters and run:

npx hardhat run scripts/deploy.js --network <network_name>

# Usage

Mint a Skill Token:

Call mintSkillToken with valid proof, root, and nullifier hash.
Verify and Transfer Skill Tokens:

Use verifyAndTransferSkillToken for cross-chain verification and transfer.
UI Interaction:

Interact with the smart contracts via frontend to mint, verify, and transfer tokens.
Use Web3 or Ethers.js to interact with smart contracts on your frontend.

Tests
Run tests using Hardhat:

npx hardhat test
This will execute all contract unit tests and ensure that the token minting and cross-chain verification processes work correctly.

# Security
1. World ID Proof Verification: Ensures secure identity and skill verification using cryptographic proofs.
2. Chainlink Oracle Integration: Provides secure and decentralized oracles for cross-chain transfers.

# Contributing

Feel free to fork the repository, submit pull requests, or open issues for suggestions and improvements.

# License

This project is licensed under the MIT License.

