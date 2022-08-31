import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { Auction } from "../src/types/dos/Auction";
import { DOSAttack } from "../src/types/dos/DOSAttack";

describe("DOS attack testcase", () => {
  it("after being declared the winner, DOSAttack.sol should not allow anyone else to become the winner", async () => {
    await deployments.fixture(["DOS"]);
    const auctionContract: Auction = await ethers.getContract("Auction");
    const attackContract: DOSAttack = await ethers.getContract("DOSAttack");

    // Now lets attack the good contract
    // Get two addresses
    const [_, addr1, addr2] = await ethers.getSigners();

    // Initially let addr1 become the current winner of the aution
    let tx = await auctionContract.connect(addr1).placeBid({
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    // Start the attack and make Attack.sol the current winner of the auction
    tx = await attackContract.attack({
      value: ethers.utils.parseEther("3.0"),
    });
    await tx.wait();

    // Now lets trying making addr2 the current winner of the auction
    tx = await auctionContract.connect(addr2).placeBid({
      value: ethers.utils.parseEther("4"),
    });
    await tx.wait();

    // Now lets check if the current winner is still attack contract
    expect(await (await auctionContract.currentBid()).bidder).to.equal(attackContract.address);
  });
});
