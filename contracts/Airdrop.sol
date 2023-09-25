// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "./IERC20.sol";

contract Airdrop {
    IERC20 public tokenContract; //代币合约
    address public owner; //合约拥有者

    constructor(address _tokenContractAddress) {
        tokenContract = IERC20(_tokenContractAddress);
        owner = msg.sender;
    }

    // 空投一个地址对应一个数量
    function oneToOne(address[] memory _to, uint256[] memory _amount) public {
        // 只有合约发布者可以调用
        require(msg.sender == owner, "Only the owner can airdrop tokens");
        // 验证数组长度相等
        require(
            _to.length == _amount.length,
            "The length of the two arrays must be the same"
        );
        // 验证合约中代币是否足够
        uint256 totalAmount = 0;
        for (uint256 i; i < _amount.length; i++) {
            totalAmount += _amount[i];
        }
        require(
            tokenContract.balanceOf(address(this)) >= totalAmount,
            "Not enough tokens in the contract"
        );

        for (uint256 i; i < _to.length; i++) {
            tokenContract.transfer(_to[i], _amount[i]);
        }
    }

    // 空投多个地址对应一个数量
    function oneToMany(address[] memory _to, uint256 _amount) public {
        // 只有合约发布者可以调用
        require(msg.sender == owner, "Only the owner can airdrop tokens");

        // 验证合约中代币是否足够
        uint256 totalAmount = _amount * _to.length;
        require(
            tokenContract.balanceOf(address(this)) >= totalAmount,
            "Not enough tokens in the contract"
        );

        for (uint256 i; i < _to.length; i++) {
            tokenContract.transfer(_to[i], _amount);
        }
    }
}
