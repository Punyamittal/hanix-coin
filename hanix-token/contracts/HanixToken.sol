// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract HanixToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY =1_000_000*10**18;
    constructor(address initialOwner)
        ERC20("HANIX","HNX")
        Ownable(initialOwner)
    {
        _mint(initialOwner,MAX_SUPPLY);
    }
}
