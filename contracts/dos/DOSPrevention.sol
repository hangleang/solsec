// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract DOSPrevention {
    struct Bid {
        uint256 bidAmount;
        address bidder;
    }
    event BidPlaced(address bidder, uint256 bidAmount);

    Bid public currentBid;
    bool private locked;
    mapping(address => uint256) public balances;

    constructor() {
        currentBid.bidder = msg.sender;
    }

    function placeBid() external payable isHigherBid {
        balances[currentBid.bidder] += currentBid.bidAmount;
        currentBid.bidder = msg.sender;
        currentBid.bidAmount = msg.value;
        emit BidPlaced(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender != currentBid.bidder, "error: current winner cannot withdraw");

        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{ value: amount }("");
        require(sent, "balance: failed to send Ether");
    }

    modifier isHigherBid() {
        require(!locked, "error: locked to prevent reentrancy attack");
        require(msg.value > currentBid.bidAmount, "balance: need to pay more than the currentBid");
        locked = true;
        _;
        locked = false;
    }
}
