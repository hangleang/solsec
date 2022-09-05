// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract UUPSNFT is Initializable, UUPSUpgradeable, ERC721Upgradeable, OwnableUpgradeable {
    function initialize() external initializer {
        __ERC721_init("UUPSNFT", "UUPSNFT");
        __Ownable_init();
        _mint(_msgSender(), 1);
    }

    function _authorizeUpgrade(address newImpl) internal override onlyOwner {}

    function version() external pure virtual returns (string memory) {
        return "v1.0.0";
    }
}
