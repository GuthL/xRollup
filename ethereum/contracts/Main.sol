pragma solidity 0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './Verifier.sol';

contract Main is Ownable, Verifier {
    using SafeMath for uint256;
    using SafeMath for uint128;

    mapping (address => mapping (address => uint128 )) tokenBalances;
    mapping (address => uint256) userKeys;
    uint256 state;
    
    event KeyRegistered(address indexed user, uint256 indexed publicKey);
    event Deposit(address indexed user, address indexed token, uint128 amount);
    event Withdraw(address indexed user, address indexed token, uint128 amount);
    event StateUpdated(uint256 oldState, uint256 newState);
    event StateRejected(uint256 oldState, uint256 rejectedState);
    
    // User Functions

    function registerKey(uint256 _publicKey) public {
        require(userKeys[msg.sender] == 0, "User has existing key");
        userKeys[msg.sender] = _publicKey;
    }
    
    // Requires approval for ERC20 token first
    function depositToken(address _token, uint128 _amount) public {
        require(tokenBalances[msg.sender][_token] == 0, "Only one deposit per token for now!");
        require(ERC20(_token).allowance(msg.sender, address(this)) >= _amount, "Not enough allowance");
        
        tokenBalances[msg.sender][_token].add(_amount);
        require(ERC20(_token).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        emit Deposit(msg.sender, _token, _amount);
    }
    
    function withdrawToken(address _token, uint128 _amount) public {
        //TODO: We will get this value from the state
        require(tokenBalances[msg.sender][_token] >= _amount, "Attempt to withdraw more than user has");

        tokenBalances[msg.sender][_token].sub(_amount);
        require(ERC20(_token).transfer(msg.sender, _amount), "Token transfer failed");
        emit Withdraw(msg.sender, _token, _amount);
    }

    // State Functions

    function getState() public view returns(uint256) {
        return state;
    }

    function setState(uint256 _newState) public onlyOwner() {
        if (verifyState(_newState)) {
            emit StateUpdated(state, _newState);
            state = _newState;
        } else {
            emit StateRejected(state, _newState);
        }
    }
}
