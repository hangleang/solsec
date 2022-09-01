// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Whitelist smart contract
contract Whitelist {
    /// @dev userEligible[user] => isEligible
    mapping(address => bool) userEligible;

    /// @dev this function will return if `user` is eligible in whitelist contract or not
    /// @param user address of user
    /// @return is `user` eligible?
    function isUserEligible(address user) external view returns (bool) {
        return userEligible[user];
    }

    /// @dev this function is used to set user eligible status
    /// @param user address of given user
    function setUserEligible(address user) external {
        userEligible[user] = true;
    }

    /// @dev fallback function
    fallback() external {}
}
