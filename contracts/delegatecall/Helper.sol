// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title the Helper smart contract
/// @dev the contract is called by delegatecall from another contract
contract Helper {
    /// @dev A sample variable
    uint256 public num;

    /// @dev setter function used to set `num` to given `_num`
    /// @param _num the given number to set `num` variable
    /// @return status Return status of the operation
    function setNum(uint256 _num) external returns (bool status) {
        num = _num;
        return true;
    }
}
