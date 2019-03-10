pragma solidity 0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './verifiers/IDepositVerifier.sol';
import './verifiers/ITransferVerifier.sol';
import './verifiers/IWithdrawVerifier.sol';

 contract Main is Ownable {
    using SafeMath for uint256;
    using SafeMath for uint128;

    struct PublicKey {
        uint256 x;
        uint256 y;
    }

    mapping (address => mapping (address => uint128 )) tokenBalances;
    mapping (address => uint256) etherBalances;
    mapping (address => PublicKey) userKeys;
    uint256 userCount;

    uint256[][] publicKeyQueue;
    uint256[] amountQueue;

    uint256 constant tokenId = 1;

    uint256 state;
    IDepositVerifier depositVerifier;
    ITransferVerifier transferVerifier;
    IWithdrawVerifier withdrawVerifier;
    
    event KeyRegistered(address indexed user, uint256 x, uint256 y);
    event Deposit(address indexed user, uint256 x, uint256 y, address indexed token, uint128 amount);
    event Withdraw(address indexed user, address indexed token, uint128 amount);
    event StateUpdated(uint256 oldState, uint256 newState);
    event StateRejected(uint256 oldState, uint256 rejectedState);
    
    // User Functions

    function registerKey(uint256 x, uint256 y) public payable {
        // require(userKeys[msg.sender] == 0, "User has existing key");
        userKeys[msg.sender] = PublicKey(x,y);
        emit KeyRegistered(msg.sender, x, y);
        
        if (msg.value > 0) {
            etherBalances[msg.sender] = msg.value;
        }
    }

    function getKey(address _user) public view returns(uint256, uint256) {
        return (userKeys[_user].x, userKeys[_user].y);
    }
    
    function getMyKey() public view returns(uint256, uint256) {
        return (userKeys[msg.sender].x, userKeys[msg.sender].y);
    }
    
    function depositEther() public payable {
        etherBalances[msg.sender] = msg.value;
    }
    
    function withdrawEther() public payable {
        msg.sender.transfer(etherBalances[msg.sender]);
    }
    
    // Requires approval for ERC20 token first
    function depositToken(address _token, uint128 _amount) public {
        require(tokenBalances[msg.sender][_token] == 0, "Only one deposit per token for now!");
        require(ERC20(_token).allowance(msg.sender, address(this)) >= _amount, "Not enough allowance");
        
        tokenBalances[msg.sender][_token].add(_amount);
        addToQueue(userKeys[msg.sender], _amount);

        require(ERC20(_token).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        emit Deposit(msg.sender, userKeys[msg.sender].x, userKeys[msg.sender].y, _token, _amount);
    }

    function addToQueue(PublicKey memory _publicKey, uint256 _amount) internal {
        // If zero slot empty
        if (publicKeyQueue[0][0] == 0) {
            publicKeyQueue[0][0] = _publicKey.x;
            publicKeyQueue[0][1] = _publicKey.y;
            amountQueue[0] = _amount;
        } 
        
        // If one slot empty
        else if (publicKeyQueue[1][0] == 0) {
            publicKeyQueue[1][0] = _publicKey.x;
            publicKeyQueue[1][1] = _publicKey.y;
            amountQueue[1] = _amount;
        }

        else {
            revert("No space in Queue!");
        }        
    }

    function clearQueueIndex(uint256 _index) internal {
        require(_index <= 2, "Only 2 index slots!");
        publicKeyQueue[_index][0] = 0;
        publicKeyQueue[_index][1] = 0;
        amountQueue[_index] = 0;
    }
    
    function withdrawToken(address _token, address _recipient, uint128 _amount, uint256 _proof, uint256 _newState) public onlyOwner() {
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
        state = _newState;
    }

    // Input = Proof
    function verifyDeposit(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint256 _newState) public onlyOwner() returns(bool) {
                uint256 _newUserCount = userCount.add(2);

                uint256[12] memory input = [
                state, 
                userCount, 
                publicKeyQueue[0][0], 
                publicKeyQueue[0][1], 
                publicKeyQueue[1][0], 
                publicKeyQueue[1][1], 
                amountQueue[0],
                amountQueue[1],
                tokenId,
                tokenId,
                _newState,
                _newUserCount
                ];

                require(depositVerifier.verifyProof(a, b, c, input));
                clearQueueIndex(0);
                clearQueueIndex(1);
            }

    function setDepositVerifier(address _newAddress) public onlyOwner() {
        depositVerifier = IDepositVerifier(_newAddress);
    }

    function setTransferVerifier(address _newAddress) public onlyOwner() {
        transferVerifier = ITransferVerifier(_newAddress);
    }

    function setWithdrawVerifier(address _newAddress) public onlyOwner() {
        withdrawVerifier = IWithdrawVerifier(_newAddress);
    }
}