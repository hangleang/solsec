import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, getChainId, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const waitConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  if (chainId == "31337") {
    // deploy mocks/test contract
  } else {
    // set external contract address
  }

  // the following will only deploy "Greeter" if the contract was never deployed or if the code changed since last deployment
  const args = ["Hello, World!"];
  const greeter = await deploy("Greeter", {
    from: deployer,
    args,
    log: true,
    autoMine: developmentChains.includes(network.name),
    waitConfirmations,
  });

  // Verify the deployment
  if (!developmentChains.includes(network.name)) {
    log("Verifying...");
    await verify(greeter.address, args);
  }
};

export default func;
func.tags = ["all", "Greeter"];
func.dependencies = []; // this contains dependencies tags need to execute before deploy this contract
