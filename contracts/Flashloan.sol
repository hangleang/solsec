// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Flashloan is FlashLoanSimpleReceiverBase {
    event PayDebt(address token, uint256 amount);

    constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider) {}

    function flashloan(address token, uint256 amount) external {
        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(receiver, token, amount, params, referralCode);
    }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 interest,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        uint256 amountOwing = amount + interest;
        IERC20(token).approve(address(POOL), amountOwing);
        emit PayDebt(token, amountOwing);
        return true;
    }
}
