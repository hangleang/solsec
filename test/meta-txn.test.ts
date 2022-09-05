import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { arrayify, parseEther } from "ethers/lib/utils";
import { deployments, ethers } from "hardhat";

import { MagicToken } from "../src/types/contracts/meta-txn/MagicToken";
import { MetaTokenTransfer } from "../src/types/contracts/meta-txn/MetaTokenTransfer";

describe("Meta Transaction testcase", () => {
  it("should let user transfer tokens through a relayer", async () => {
    await deployments.fixture(["MetaTxn"]);

    // Get three addresses, treat one as the user address
    // one as the relayer address, and one as a recipient address
    const [_, sender, relayer, recipient]: SignerWithAddress[] = await ethers.getSigners();
    const magicToken: MagicToken = await ethers.getContract("MagicToken");
    const metaTransfer: MetaTokenTransfer = await ethers.getContract("MetaTokenTransfer");

    // Mint 10,000 tokens to sender address (for testing)
    const senderConnectInstance = magicToken.connect(sender);
    const mintAmount: BigNumber = parseEther("10000");
    const mintTxn = await senderConnectInstance.faucet(mintAmount);
    await mintTxn.wait();

    // Have user infinite approve the token sender contract for transferring 'MagicToken'
    const approveTxn = await senderConnectInstance.approve(
      metaTransfer.address,
      BigNumber.from(
        // This is uint256's max value (2^256 - 1) in hex
        // Fun Fact: There are 64 f's in here.
        // In hexadecimal, each digit can represent 4 bits
        // f is the largest digit in hexadecimal (1111 in binary)
        // 4 + 4 = 8 i.e. two hex digits = 1 byte
        // 64 digits = 32 bytes
        // 32 bytes = 256 bits = uint256
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ),
    );
    await approveTxn.wait();

    // Have user sign message to transfer 10 tokens to recipient
    let nonce = 1;
    const transferAmount: BigNumber = parseEther("10");
    const messageHash = await metaTransfer.getHash(
      sender.address,
      recipient.address,
      transferAmount,
      magicToken.address,
      nonce,
    );
    const signature: string = await sender.signMessage(arrayify(messageHash));

    const relayerConnectMetaTxnInstance = metaTransfer.connect(relayer);
    const metaTxn = await relayerConnectMetaTxnInstance.transfer(
      sender.address,
      recipient.address,
      transferAmount,
      magicToken.address,
      nonce,
      signature,
    );
    await metaTxn.wait();

    const senderBalance: BigNumber = await magicToken.balanceOf(sender.address);
    const recipientBalance: BigNumber = await magicToken.balanceOf(recipient.address);
    const expectedSenderBalance: BigNumber = mintAmount.sub(transferAmount);

    expect(senderBalance).to.eq(expectedSenderBalance);
    expect(recipientBalance).to.eq(transferAmount);

    // Increment the nonce
    nonce++;
  });
});
