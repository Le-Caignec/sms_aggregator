import { ethers } from "hardhat";

async function main() {
  const SMS_Aggregator = await ethers.getContractFactory("SMS_Aggregator");
  const sms_aggreagator = await SMS_Aggregator.deploy();

  await sms_aggreagator.deployed();

  console.log(`deployed to ${sms_aggreagator.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
