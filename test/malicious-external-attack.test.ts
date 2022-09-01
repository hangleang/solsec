import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { WhitelistConsumer } from "../src/types/contracts/malicious-external/WhitelistConsumer";

describe("Malicious External Attack testcase", () => {
  it("should change the owner of the WhitelistConsumer contract", async () => {
    await deployments.fixture(["MaliciousAttack"]);
    const [_, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const consumerContract: WhitelistConsumer = await ethers.getContract("WhitelistConsumer");

    // Now lets add an address to the eligibility list
    const tx = await consumerContract.connect(addr1).addToWhitelist();
    await tx.wait();

    // check if the user is eligible
    expect(await consumerContract.connect(addr1).isUserEligible()).to.equal(false);
  });
});
