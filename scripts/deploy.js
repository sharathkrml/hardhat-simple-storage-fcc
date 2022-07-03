const hre = require("hardhat");

async function main() {
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simplestorage = await SimpleStorage.deploy();

  await simplestorage.deployed();

  console.log("SimpleStorage deployed to:", simplestorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
