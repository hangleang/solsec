import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { Login } from "../src/types/contracts/Login";
import { Login__factory } from "../src/types/factories/contracts/Login__factory";

const deployLoginFixture = deployments.createFixture(async ({ deployments, ethers }) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const usernameBytes = ethers.utils.formatBytes32String("test");
  const passwordBytes = ethers.utils.formatBytes32String("password");
  const loginFactory: Login__factory = await ethers.getContractFactory("Login");
  const loginContract: Login = await loginFactory.deploy(usernameBytes, passwordBytes);
  return {
    loginContract,
  };
});

describe("Login testcase", () => {
  it("should be able to read the private variables password and username", async function () {
    // await deployments.fixture(["Login"]);
    const { loginContract } = await deployLoginFixture();
    // Get the storage at storage slot 0,1
    const slot0Bytes: string = await ethers.provider.getStorageAt(loginContract.address, 0);
    const slot1Bytes: string = await ethers.provider.getStorageAt(loginContract.address, 1);

    // We are able to extract the values of the private variables
    expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("test");
    expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("password");
  });
});
