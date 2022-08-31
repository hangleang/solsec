import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";

import { Attack } from "../src/types/delegatecall/Attack";
import { Victim } from "../src/types/delegatecall/Victim";

describe("DelegateCall testcase", () => {
  it("should change the owner of the victim contract", async () => {
    await deployments.fixture(["DelegateCall"]);
    const { deployer } = await getNamedAccounts();
    const victimContract: Victim = await ethers.getContract("Victim", deployer);
    const attackContract: Attack = await ethers.getContract("Attack", deployer);

    // Start the attack
    const tx = await attackContract.attack();
    await tx.wait();

    expect(await victimContract.owner()).to.equal(attackContract.address);
  });
});
