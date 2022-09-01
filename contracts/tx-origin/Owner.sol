// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Owner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address newOwner) external {
        require(tx.origin == owner, "access: not owner");
        owner = newOwner;
    }
}
