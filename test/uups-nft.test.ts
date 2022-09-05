import { expect } from "chai";
import { deployments, ethers, upgrades } from "hardhat";

import { UUPSNFT__factory } from "../src/types/factories/contracts/proxy/UUPSNFT__factory";
import { UUPSNFTv2__factory } from "../src/types/factories/contracts/proxy/UUPSNFTv2__factory";

const deployUUPSNFTFixture = deployments.createFixture(async ({ deployments, ethers }) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const uupsNFTFactory: UUPSNFT__factory = await ethers.getContractFactory("UUPSNFT");
  const uupsNFTv2Factory: UUPSNFTv2__factory = await ethers.getContractFactory("UUPSNFTv2");
  let proxyContract = await upgrades.deployProxy(uupsNFTFactory, {
    kind: "uups",
  });
  const currentVersion = await proxyContract.version();
  expect(currentVersion).to.eq("v1.0.0");
  proxyContract = await upgrades.upgradeProxy(proxyContract, uupsNFTv2Factory);

  return {
    proxyContract,
  };
});

describe("UUPS NFT testcase", () => {
  it("should deploy an upgradeable ERC721 Contract", async function () {
    const { proxyContract } = await deployUUPSNFTFixture();
    const [owner] = await ethers.getSigners();
    expect(await proxyContract.version()).to.eq("v2.0.0");
    expect(await proxyContract.ownerOf(1)).to.eq(owner.address);
  });
});
