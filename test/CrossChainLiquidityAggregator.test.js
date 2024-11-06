const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrossChainLiquidityAggregator", function () {
    let CrossChainLiquidityAggregator, aggregator;
    let owner, addr1, addr2;
    const chainlinkCCIPRouterAddress = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"; // chainlink CCIP router address
    const interestRateOracleAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43"; // Pyth Stable price sources oracle address


    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy contract
        CrossChainLiquidityAggregator = await ethers.getContractFactory("CrossChainLiquidityAggregator");
        aggregator = await CrossChainLiquidityAggregator.deploy(chainlinkCCIPRouterAddress, interestRateOracleAddress);
        await aggregator.waitForDeployment();
    });

    it("Should issue a loan", async function () {
        const loanAmount = ethers.parseEther("1");
        const interestRate = 500; // 5% in basis points
        const term = 30 * 24 * 60 * 60; // 30 days

        await aggregator.connect(addr1).issueLoan(loanAmount, interestRate, term);

        const loan = await aggregator.loans(1);
        expect(loan.borrower).to.equal(addr1.address);
        expect(loan.amount).to.equal(loanAmount);
        expect(loan.interestRate).to.equal(interestRate);
    });

    it("Should allow loan repayment", async function () {
        const loanAmount = ethers.parseEther("1");
        const interestRate = 500; // 5% in basis points
        const term = 30 * 24 * 60 * 60; // 30 days

        await aggregator.connect(addr1).issueLoan(loanAmount, interestRate, term);

        // Calculate total amount due (principal + interest)
        const interest = await aggregator.calculateInterest(loanAmount, interestRate, term);
        const totalAmountDue = loanAmount.add(interest);

        // Approve and repay
        await addr1.sendTransaction({ to: aggregator.address, value: totalAmountDue });
        await aggregator.connect(addr1).repayLoan(1);

        const loan = await aggregator.loans(1);
        expect(loan.isActive).to.equal(false);
    });

    it("Should add and remove liquidity", async function () {
        const tokenAmount = ethers.parseEther("2");

        // Add liquidity
        await aggregator.connect(addr1).addLiquidity(addr1.address, tokenAmount);
        const pool = await aggregator.liquidityPools(addr1.address);
        expect(pool.totalLiquidity).to.equal(tokenAmount);

        // Remove liquidity
        await aggregator.connect(addr1).removeLiquidity(addr1.address, tokenAmount);
        const updatedPool = await aggregator.liquidityPools(addr1.address);
        expect(updatedPool.totalLiquidity).to.equal(0);
    });
});
