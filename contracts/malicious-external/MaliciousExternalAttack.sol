// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Malicious External Attack smart contract
contract MaliciousExternalAttack is Ownable {
    /// @dev userEligible[user] => isEligible
    mapping(address => bool) userEligible;

    /// @dev this function will return if `user` is eligible in whitelist contract or not
    /// @param user address of user
    /// @return is `user` eligible?
    function isUserEligible(address user) external view returns (bool) {
        if (user == owner()) {
            return true;
        }
        return false;
    }

    /// @dev this function is used to set user eligible status
    /// @param user address of given user
    function setUserEligible(address user) external {
        userEligible[user] = true;
    }

    /// @dev fallback function
    fallback() external {}
}
