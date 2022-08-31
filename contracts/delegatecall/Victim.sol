//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Victim {
    address public helper;
    address public owner;
    uint256 public num;

    constructor(address _helper) {
        helper = _helper;
        owner = msg.sender;
    }

    function setNum(uint256 _num) external returns (bool status) {
        (bool success, bytes memory result) = helper.delegatecall(abi.encodeWithSignature("setNum(uint256)", _num));
        require(success, "status: failed");
        return abi.decode(result, (bool));
    }
}
