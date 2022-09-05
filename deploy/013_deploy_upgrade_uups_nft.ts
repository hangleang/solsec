import { DeployFunction } from "hardhat-deploy/types";

import { developmentChains } from "../helper-config";
import { verify } from "../helper-functions";
import { UUPSNFT__factory } from "../src/types/factories/contracts/proxy/UUPSNFT__factory";
import { UUPSNFTv2__factory } from "../src/types/factories/contracts/proxy/UUPSNFTv2__factory";

const func: DeployFunction = async ({ deployments, network, ethers, upgrades }) => {
  const { log } = deployments;
  const isDev = developmentChains.includes(network.name);
  const uupsNFTFactory: UUPSNFT__factory = await ethers.getContractFactory("UUPSNFT");
  const uupsNFTv2Factory: UUPSNFTv2__factory = await ethers.getContractFactory("UUPSNFTv2");

  if (isDev) {
    // deploy mocks/test contract
  } else {
    // set external contract address
  }

  // the following will only deploy "UUPSNFT" if the contract was never deployed or if the code changed since last deployment
  log("deploying UUPS NFT contract....");
  let proxyContract = await upgrades.deployProxy(uupsNFTFactory, {
    kind: "uups",
  });
  log("deployed contract:", proxyContract.address);

  log("upgrading UUPS NFT contract....");
  proxyContract = await upgrades.upgradeProxy(proxyContract, uupsNFTv2Factory);
  log("upgraded contract:", proxyContract.address);

  // Verify the deployment
  if (!isDev) {
    log("Verifying...");
    await verify(proxyContract.address, []);
  }
};

export default func;
func.tags = ["all", "UUPSNFT"];
func.dependencies = []; // this contains dependencies tags need to execute before deploy this contract
