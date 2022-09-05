// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MetaTokenTransfer {
    using ECDSA for bytes32;

    mapping(bytes32 => bool) internal executedTxn;

    function transfer(
        address sender,
        address recipient,
        uint256 amount,
        address tokenAddress,
        uint256 nonce,
        bytes memory signature
    ) external {
        bytes32 messageHash = getHash(sender, recipient, amount, tokenAddress, nonce);
        bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();
        // Require that this signature hasn't already been executed
        require(!executedTxn[signedMessageHash], "signature: already executed!");

        address signer = signedMessageHash.recover(signature);
        require(signer == sender, "signature: not from sender");

        // Mark this signature as having been executed now
        executedTxn[signedMessageHash] = true;
        bool sent = IERC20(tokenAddress).transferFrom(sender, recipient, amount);
        require(sent, "transfer: failed");
    }

    function getHash(
        address sender,
        address recipient,
        uint256 amount,
        address tokenAddress,
        uint256 nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, recipient, amount, tokenAddress, nonce));
    }
}
