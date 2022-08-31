import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  let value: BigNumber;
  if (isDev) {
    value = ethers.utils.parseEther("0.1");
    // deploy mocks/test contract
  } else {
    value = BigNumber.from(0);
    // set external contract address
  }

  // the following will only deploy "Game" if the contract was never deployed or if the code changed since last deployment
  const game = await deploy("Game", {
    from: deployer,
    args: [],
    value,
    log: true,
    autoMine: isDev,
    waitConfirmations,
  });

  // Verify the deployment
  if (!isDev) {
    log("Verifying...");
    await verify(game.address, []);
  }
};

export default func;
func.tags = ["all", "Randomness", "Game"];
func.dependencies = []; // this contains dependencies tags need to execute before deploy this contract
