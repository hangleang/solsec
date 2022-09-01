import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  // the following will only deploy "TxOriginAttack" if the contract was never deployed or if the code changed since last deployment
  const ownerContract = await deployments.get("Owner");
  const args = [ownerContract.address];
  const attack = await deploy("TxOriginAttack", {
    from: deployer,
    args,
    log: true,
    autoMine: isDev,
    waitConfirmations,
  });

  // Verify the deployment
  if (!isDev) {
    log("Verifying...");
    await verify(attack.address, []);
  }
};

export default func;
func.tags = ["all", "TxOrigin", "TxOriginAttack"];
func.dependencies = ["Owner"]; // this contains dependencies tags need to execute before deploy this contract
