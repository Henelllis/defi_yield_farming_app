pragma solidity >=0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";


contract TokenFarm {

    string public name="Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1. Stakes Tokens ( Deposit )
    function stakeTokens(uint _amount) public {

        require(_amount > 0, "amount cannot be 0");
        //transfer mock dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add user to Stakers arr if and only if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;



    }

    // 2. Issuing Tokens ()
    function issueToken() public {
        require(msg.sender == owner, "caller must be the owner");
        for(uint i=0 ; i< stakers.length; i++ ){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if( balance > 0){
                dappToken.transfer(recipient, balance);
            }
        }
    }


    // 3. Unstaking Tokens ( Withdraw )



}