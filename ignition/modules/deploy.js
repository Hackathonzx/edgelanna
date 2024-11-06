const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const CrossChainLiquidityAggregator = await hre.ethers.getContractFactory("CrossChainLiquidityAggregator");

    // Define the addresses for Chainlink CCIP Router and Interest Rate Oracle
    const chainlinkCCIPRouterAddress = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"; // chainlink CCIP router address
    const interestRateOracleAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43"; // Pyth Stable price sources oracle address

    // Deploy the contract
    const aggregator = await CrossChainLiquidityAggregator.deploy(chainlinkCCIPRouterAddress, interestRateOracleAddress);

    // Wait for the deployment to complete
    await aggregator.waitForDeployment();

    console.log("CrossChainLiquidityAggregator deployed to:", await aggregator.getAddress());
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
