import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  // the following will only deploy "WhitelistConsumer" if the contract was never deployed or if the code changed since last deployment
  const attack = await deployments.get("MaliciousExternalAttack");
  const args = [attack.address];
  const consumer = await deploy("WhitelistConsumer", {
    from: deployer,
    args,
    log: true,
    autoMine: isDev,
    waitConfirmations,
  });

  // Verify the deployment
  if (!isDev) {
    log("Verifying...");
    await verify(consumer.address, []);
  }
};

export default func;
func.tags = ["all", "MaliciousAttack", "WhitelistConsumer"];
func.dependencies = ["MaliciousExternalAttack"]; // this contains dependencies tags need to execute before deploy this contract
