import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  // the following will only deploy "RandomnessAttack" if the contract was never deployed or if the code changed since last deployment
  const game = await deployments.get("Game");
  const args = [game.address];
  const attack = await deploy("RandomnessAttack", {
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
func.tags = ["all", "Randomness", "RandomnessAttack"];
func.dependencies = ["Game"]; // this contains dependencies tags need to execute before deploy this contract
