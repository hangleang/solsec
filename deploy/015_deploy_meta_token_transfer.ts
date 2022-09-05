import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  if (isDev) {
    // deploy mocks/test contract
  } else {
    // set external contract address
  }

  // the following will only deploy "MetaTokenTransfer" if the contract was never deployed or if the code changed since last deployment
  const metaTransfer = await deploy("MetaTokenTransfer", {
    from: deployer,
    args: [],
    log: true,
    autoMine: isDev,
    waitConfirmations,
  });

  // Verify the deployment
  if (!isDev) {
    log("Verifying...");
    await verify(metaTransfer.address, []);
  }
};

export default func;
func.tags = ["all", "MetaTxn", "MetaTokenTransfer"];
func.dependencies = ["MagicToken"]; // this contains dependencies tags need to execute before deploy this contract
