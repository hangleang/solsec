// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./UUPSNFT.sol";

contract UUPSNFTv2 is UUPSNFT {
    function version() external pure virtual override returns (string memory) {
        return "v2.0.0";
    }
}
