import { DeployFunction } from "hardhat-deploy/types";

import { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } from "../helper-config";
import { verify } from "../helper-functions";

const func: DeployFunction = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDev = developmentChains.includes(network.name);
  const waitConfirmations = isDev ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;

  // the following will only deploy "DOSAttack" if the contract was never deployed or if the code changed since last deployment
  const auction = await deployments.get("Auction");
  const args = [auction.address];
  const attack = await deploy("DOSAttack", {
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
func.tags = ["all", "DOS", "DOSAttack"];
func.dependencies = ["Auction"]; // this contains dependencies tags need to execute before deploy this contract
