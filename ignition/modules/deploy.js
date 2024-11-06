const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Set up constructor parameters for SkillToken
  const name = "SkillToken";
  const symbol = "SKT";
  const appId = "your-app-id";           // Update with actual App ID
  const actionId = "your-action-id";      // Update with actual Action ID
  const worldIdAddress = "0x...";         // Replace with IWorldID contract address
  
  // Deploy SkillToken contract
  const SkillToken = await ethers.getContractFactory("SkillToken");
  const skillToken = await SkillToken.deploy(name, symbol, worldIdAddress, appId, actionId);

  await skillToken.waitForDeployment();
  console.log("SkillToken deployed to:", await skillToken.getAddress());

  // Set up constructor parameters for CrossChainSkillVerification
  const skillTokenAddress = skillToken.address;
  const oracle = process.env.ORACLE_ADDRESS;;                 // Replace with Chainlink Oracle address
  const jobId = ethers.utils.formatBytes32String(process.env.JOB_ID);
  const fee = ethers.utils.parseUnits("0.1", "ether"); // Fee for Chainlink request
  const linkToken = process.env.LINK_TOKEN_ADDRESS;      // LINK token address on the network

  // Deploy CrossChainSkillVerification contract
  const CrossChainSkillVerification = await ethers.getContractFactory("CrossChainSkillVerification");
  const crossChainSkillVerification = await CrossChainSkillVerification.deploy(
    skillTokenAddress,
    worldIdAddress,
    oracle,
    jobId,
    fee,
    linkTokenAddress
  );

  await crossChainSkillVerification.waitForDeployment();
  console.log("CrossChainSkillVerification deployed to:", await crossChainSkillVerification.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
