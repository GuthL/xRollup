pragma solidity 0.5.1;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import './Verifier.sol';

contract Main is Ownable, Verifier{
    mapping (address => mapping (address => uint128 )) tokenBalances;
    mapping (address => uint256) userKeys;
    uint256 state;
    
    event KeyRegistered(address user, uint256 publicKey);
    event Deposit(address user, address token, uint128 amount);
    event Withdraw(address user, address token, uint128 amount);
    event StateUpdated(uint256 oldState, uint256 newState);
    event StateRejected(uint256 oldState, uint256 rejectedState);
    
    // User Functions

    function registerKey(uint256 _publicKey) public {
        require(userKeys[msg.sender] == 0, "User has existing key");
    }
    
    function depositToken(address _token, uint128 _amount) public {
        require(tokenBalances[msg.sender][_token] == 0, "Only one deposit per token for now!");
        
        ERC20 memory tokenContract = ERC20(_token);
        require(tokenContract.tranfer(msg.sender, address(this), _amount), "Token transfer failed");
        tokenBalances[msg.sender][_token] += _amount;
    }
    
    function withdrawToken(address _token, uint128 _amount) public {
        require(tokenBalances[user][_token] != 0, "User must have tokens");
        require(tokenContract.tranfer(address(this), msg.sender, _amount), "Token transfer failed");

    }

    // State Functions

    function getState() public {
        return state;
    }

    function setState(uint256 _newState) public {
        if (verifyState(_newState)) {
            emit StateUpdated(state, _newState);
            state = _newState;
        } else {
            emit StateRejected(state, _newState);
        }
    }
}
