import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { Owner } from "../src/types/contracts/tx-origin/Owner";
import { TxOriginAttack } from "../src/types/contracts/tx-origin/TxOriginAttack";

describe("TxOrigin Attack testcase", () => {
  it("TxOriginAttack.sol will be able to change the owner of Owner.sol", async () => {
    await deployments.fixture(["TxOrigin"]);
    const [_, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const ownerContract: Owner = await ethers.getContract("Owner");
    const attackContract: TxOriginAttack = await ethers.getContract("TxOriginAttack");

    // Start the attack
    const tx = await attackContract.connect(addr1).attack();
    await tx.wait();

    // Now lets check if the current owner of Owner.sol is actually TxOriginAttack.sol
    expect(await ownerContract.owner()).to.equal(attackContract.address);
  });
});
