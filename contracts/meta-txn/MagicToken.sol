// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MagicToken is ERC20 {
    constructor() ERC20("MagicToken", "MT") {}

    function faucet(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
