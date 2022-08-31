// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Game {
    constructor() payable {}

    /**
        Randomly picks a number out of `0 to 2²⁵⁶–1`.
    */
    function pickACard() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number), block.timestamp)));
    }

    /**
        It begins the game by first choosing a random number by calling `pickACard`
        It then verifies if the random number selected is equal to `_guess` passed by the player
        If the player guessed the correct number, it sends the player `0.1 ether`
    */
    function guess(uint256 _guess) external {
        uint256 _pickedCard = pickACard();

        if (_guess == _pickedCard) {
            payable(msg.sender).transfer(0.1 ether);
        }
    }

    /**
        Returns the balance of ether in the contract
    */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
