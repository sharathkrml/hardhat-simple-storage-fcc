import { ethers, run, network } from "hardhat";

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simplestorage = await SimpleStorage.deploy();

  await simplestorage.deployed();

  console.log("SimpleStorage deployed to:", simplestorage.address);
  if (network.config.chainId === 4) {
    await simplestorage.deployTransaction.wait(6); //wait for 6 blocks to be mined
    await verify(simplestorage.address, []);
  }
  const currentValue = await simplestorage.retrieve();
  console.log(`Current value is :${currentValue}`);
  // update
  const transactionResponse = await simplestorage.store(7);
  await transactionResponse.wait(1); //wait 1 block
  const updatedvalue = await simplestorage.retrieve();
  console.log(`Updated value is :${updatedvalue}`);
}
const verify = async (contractAddress: string, args: any[]) => {
  console.log("verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    console.log(e);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
