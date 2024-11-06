const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SkillToken Contract", function () {
  let SkillToken, skillToken, WorldID, worldId, owner, addr1, addr2;
  
  beforeEach(async function () {
    // Deploy WorldID mock contract
    WorldID = await ethers.getContractFactory("WorldIDMock");
    worldId = await WorldID.deploy();
    await worldId.waitForDeployment();

    // Deploy SkillToken contract
    SkillToken = await ethers.getContractFactory("SkillToken");
    skillToken = await SkillToken.deploy("SkillToken", "SKT", worldId.address, "appId", "actionId");
    await skillToken.waitForDeployment();

    // Get accounts
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should mint a SkillToken for a user", async function () {
    // Mock a proof for testing purposes
    const root = 1234;
    const nullifierHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("nullifier"));
    const proof = [0, 1, 2, 3, 4, 5, 6, 7]; // Example proof

    // Mint the SkillToken for addr1
    await expect(skillToken.connect(addr1).mintSkillToken(root, nullifierHash, proof, "Skill A"))
      .to.emit(skillToken, "TokenMinted")
      .withArgs(addr1.address, 1, "Skill A");

    // Check token URI for the minted token
    expect(await skillToken.tokenURI(1)).to.equal("Skill A");
  });

  it("Should prevent minting with the same nullifierHash", async function () {
    // Mint the SkillToken for addr1
    const root = 1234;
    const nullifierHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("nullifier"));
    const proof = [0, 1, 2, 3, 4, 5, 6, 7]; // Example proof

    await skillToken.connect(addr1).mintSkillToken(root, nullifierHash, proof, "Skill A");

    // Try minting again with the same nullifierHash
    await expect(skillToken.connect(addr1).mintSkillToken(root, nullifierHash, proof, "Skill B"))
      .to.be.revertedWith("Invalid nullifier");
  });
});

describe("CrossChainSkillVerification Contract", function () {
  let CrossChainSkillVerification, crossChainVerification, skillToken, worldId, owner, addr1;
  
  beforeEach(async function () {
    // Deploy WorldID mock contract
    const WorldID = await ethers.getContractFactory("WorldIDMock");
    worldId = await WorldID.deploy();
    await worldId.deployed();

    // Deploy SkillToken contract
    const SkillToken = await ethers.getContractFactory("SkillToken");
    skillToken = await SkillToken.deploy("SkillToken", "SKT", worldId.address, "appId", "actionId");
    await skillToken.deployed();

    // Deploy CrossChainSkillVerification contract
    CrossChainSkillVerification = await ethers.getContractFactory("CrossChainSkillVerification");
    crossChainVerification = await CrossChainSkillVerification.deploy(
      skillToken.address,
      worldId.address,
      "oracleAddress",
      "jobId",
      1,
      "linkTokenAddress"
    );
    await crossChainVerification.deployed();

    // Get accounts
    [owner, addr1] = await ethers.getSigners();
  });

  it("Should process cross-chain skill verification", async function () {
    // Mint a token for addr1
    const root = 1234;
    const nullifierHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("nullifier"));
    const proof = [0, 1, 2, 3, 4, 5, 6, 7]; // Example proof
    await skillToken.connect(addr1).mintSkillToken(root, nullifierHash, proof, "Skill A");

    // Simulate cross-chain skill verification
    await expect(
      crossChainVerification.connect(addr1).verifyAndTransferSkillToken(root, nullifierHash, proof, 1)
    )
      .to.emit(crossChainVerification, "CrossChainTransferSuccess")
      .withArgs("requestId");
  });
});
