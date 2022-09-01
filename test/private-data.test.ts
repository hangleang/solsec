import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { PrivateData } from "../src/types/contracts/PrivateData";
import { PrivateData__factory } from "../src/types/factories/contracts/PrivateData__factory";

const deployPrivateDataFixture = deployments.createFixture(async ({ deployments, ethers }) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const usernameBytes = ethers.utils.formatBytes32String("test");
  const passwordBytes = ethers.utils.formatBytes32String("password");
  const privateFactory: PrivateData__factory = await ethers.getContractFactory("PrivateData");
  const privateContract: PrivateData = await privateFactory.deploy(usernameBytes, passwordBytes);
  return {
    privateContract,
  };
});

describe("PrivateContract testcase", () => {
  it("should be able to read the private variables password and username", async function () {
    // await deployments.fixture(["Login"]);
    const { privateContract } = await deployPrivateDataFixture();
    // Get the storage at storage slot 0,1
    const slot0Bytes: string = await ethers.provider.getStorageAt(privateContract.address, 0);
    const slot1Bytes: string = await ethers.provider.getStorageAt(privateContract.address, 1);

    // We are able to extract the values of the private variables
    expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("test");
    expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("password");
  });
});
