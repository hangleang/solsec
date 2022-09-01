// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Private Data smart contract
/// @dev Each bytes32 variable would occupy one slot
/// because bytes32 variable has 256 bits(32*8)
/// which is the size of one slot
contract PrivateData {
    /// @dev username is stored in Slot 0
    bytes32 private username;
    /// @dev password is stored in Slot 1
    bytes32 private password;

    /// @dev the constructor function of PrivateData
    /// @param _username the given username
    /// @param _password the given password
    constructor(bytes32 _username, bytes32 _password) {
        username = _username;
        password = _password;
    }
}
