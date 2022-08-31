import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  // the following will only deploy "DelegateCallAttack" if the contract was never deployed or if the code changed since last deployment
  const victim = await deployments.get("Victim");
  const args = [victim.address];
  const attack = await deploy("DelegateCallAttack", {
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
func.tags = ["all", "DelegateCall", "DelegateCallAttack"];
func.dependencies = ["Victim"]; // this contains dependencies tags need to execute before deploy this contract
