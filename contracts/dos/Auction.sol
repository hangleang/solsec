// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Auction {
    struct Bid {
        uint256 bidAmount;
        address bidder;
    }
    event BidPlaced(address bidder, uint256 bidAmount);

    Bid public currentBid;
    bool private locked;

    constructor() {
        currentBid.bidder = msg.sender;
    }

    function placeBid() external payable isHigherBid {
        (bool success, ) = currentBid.bidder.call{ value: currentBid.bidAmount }("");
        if (success) {
            currentBid.bidder = msg.sender;
            currentBid.bidAmount = msg.value;
        }
        emit BidPlaced(msg.sender, msg.value);
    }

    modifier isHigherBid() {
        require(!locked, "error: locked to prevent reentrancy attack");
        require(msg.value > currentBid.bidAmount, "balance: need to pay more than the currentBid");
        locked = true;
        _;
        locked = false;
    }
}
