// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "./IERC20.sol";

contract Faucet {
    IERC20 public tokenContract; //代币合约
    mapping(address => uint256) public recivedRecord; //领取记录
    uint256 public amountEachTime; //每次可领取的数量
    address public owner; //合约拥有者

    constructor(address _tokenContractAddress, uint256 _amountEachTime) {
        tokenContract = IERC20(_tokenContractAddress);
        amountEachTime = _amountEachTime;
        owner = msg.sender;
    }

    function withdraw() external {
        if (recivedRecord[msg.sender] > 0) {
            require(
                recivedRecord[msg.sender] - block.timestamp >= 1 days,
                "You can only request tokens once every 24 hours"
            );
        }

        require(
            tokenContract.balanceOf(address(this)) >= amountEachTime,
            "Not enough tokens in the contract"
        );

        recivedRecord[msg.sender] = block.timestamp;
        tokenContract.transfer(msg.sender, amountEachTime);
    }

    function setAmountEachTime(uint256 _amountEachTime) public {
        require(msg.sender == owner, "Only the owner can set the amount");
        amountEachTime = _amountEachTime;
    }
}
