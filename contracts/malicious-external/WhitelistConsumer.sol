// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Whitelist.sol";

/// @title Whitelist Consumer contract
contract WhitelistConsumer {
    /// @notice whitelist contract
    /// @dev NOTE: THIS SHOULD MAKE PUBLIC, SO USERS CAN VERIFIED
    Whitelist whitelist;

    /// @dev constructor function
    /// @param _whitelist given whitelist contract address
    constructor(address _whitelist) payable {
        whitelist = Whitelist(_whitelist);
    }

    /// @dev this function will return if `msg.sender` is eligible in whitelist contract or not
    /// @return is `msg.sender` eligible?
    function isUserEligible() external view returns (bool) {
        return whitelist.isUserEligible(msg.sender);
    }

    /// @dev this function is used to add `msg.sender` to eligible in whitelist contract
    function addToWhitelist() external {
        whitelist.setUserEligible(msg.sender);
    }

    /// @dev fallback function
    fallback() external {}
}
