import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { Greeter } from "../src/types/Greeter";

describe("Greeter testcase", () => {
  it("should return the new greeting once it's changed", async function () {
    await deployments.fixture(["Greeter"]);
    const [deployer]: SignerWithAddress[] = await ethers.getSigners();

    const greeter: Greeter = await ethers.getContract("Greeter", deployer);
    expect(await greeter.connect(deployer).greet()).to.equal("Hello, World!");

    await greeter.setGreeting("Bonjour, le monde!");
    expect(await greeter.connect(deployer).greet()).to.equal("Bonjour, le monde!");
  });
});
