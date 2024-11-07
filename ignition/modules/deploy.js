const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Set up constructor parameters for SkillToken
  const name = "SkillToken";
  const symbol = "SKT";
  const appId = "app_c6e89cda89f9c67d47dfefc0697287b1";   // Update with actual App ID
  const actionId = "verify-skill";   // Update with actual Action ID
  const worldIdAddress = "0x57f928158C3EE7CDad1e4D8642503c4D0201f611";    // Replace with IWorldID contract address

  // // Deploy SkillToken contract
  // const SkillToken = await ethers.getContractFactory("SkillToken");
  // const skillToken = await SkillToken.deploy(name, symbol, worldIdAddress, appId, actionId);

  // await skillToken.waitForDeployment();
  // console.log("SkillToken deployed to:", await skillToken.getAddress());

  // Set up constructor parameters for CrossChainSkillVerification
  const skillTokenAddress = "0x069F92465a8795a06A28B1e85f320D57CE29Bc8F";
  const oracle = process.env.ORACLE_ADDRESS;;      // Replace with Chainlink Oracle address
  const jobId = ethers.parseBytes32String(process.env.JOB_ID);
  const fee = ethers.parseUnits("0.1", "ether"); // Fee for Chainlink request
  const linkTokenAddress = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";  // LINK token address on the network

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
