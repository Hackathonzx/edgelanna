const { ethers } = require("hardhat");

async function main() {
  // Set up constructor parameters for SkillToken
  const name = "SkillToken";
  const symbol = "SKT";
  const appId = "app_c6e89cda89f9c67d47dfefc0697287b1";   // Update with actual App ID
  const actionId = "verify-skill";   // Update with actual Action ID
  const worldIdAddress = "0x57f928158C3EE7CDad1e4D8642503c4D0201f611";    // Replace with IWorldID contract address

  // Deploy SkillToken contract
  const SkillToken = await ethers.getContractFactory("SkillToken");
  const skillToken = await SkillToken.deploy(name, symbol, worldIdAddress, appId, actionId);

  await skillToken.waitForDeployment();
  console.log("SkillToken deployed to:", await skillToken.getAddress());

  // Set up constructor parameters for CrossChainSkillVerification
  const skillTokenAddress = skillToken.address;
  const oracle = process.env.ORACLE_ADDRESS;;      // Replace with Chainlink Oracle address
  const jobId = "0x" + "8ced832954544a3c98543c94a51d6a8d".padEnd(64, "0");
  const fee = ethers.parseEther("0.1"); // Note: parseEther instead of parseUnits in newer versions
  const linkTokenAddress = process.env.LINK_TOKEN_ADDRESS;
  
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
