pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {

    constructor() ERC20("ERC20Token", "ERC20"){
        _mint(msg.sender, 5000000 * 10 ** uint256(decimals()));
    }
}