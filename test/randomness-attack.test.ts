import { expect } from "chai";
import { BigNumber } from "ethers";
import { deployments, ethers } from "hardhat";

import { Game } from "../src/types/contracts/randomness/Game";
import { RandomnessAttack } from "../src/types/contracts/randomness/RandomnessAttack";

describe("Randomness testcase", () => {
  it("should be able to guess the exact number", async () => {
    await deployments.fixture(["Randomness"]);
    const gameContract: Game = await ethers.getContract("Game");
    const attackContract: RandomnessAttack = await ethers.getContract("RandomnessAttack");

    // Start the attack
    const tx = await attackContract.attack();
    await tx.wait();

    const gameBalance = await gameContract.getBalance();
    expect(gameBalance).to.equal(BigNumber.from(0));
  });
});
