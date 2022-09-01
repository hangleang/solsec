# Solidity API

## Helper

_the contract is called by delegatecall from another contract_

### num

```solidity
uint256 num
```

_A sample variable_

### setNum

```solidity
function setNum(uint256 _num) external returns (bool status)
```

_setter function used to set `num` to given `_num`_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _num | uint256 | the given number to set `num` variable |

## PrivateData

_Each bytes32 variable would occupy one slot
because bytes32 variable has 256 bits(32*8)
which is the size of one slot_

### username

```solidity
bytes32 username
```

_username is stored in Slot 0_

### password

```solidity
bytes32 password
```

_password is stored in Slot 1_

### constructor

```solidity
constructor(bytes32 _username, bytes32 _password) public
```

_the constructor function of PrivateData_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _username | bytes32 | the given username |
| _password | bytes32 | the given password |

## Owner

### owner

```solidity
address owner
```

### constructor

```solidity
constructor() public
```

### setOwner

```solidity
function setOwner(address newOwner) external
```

## TxOriginAttack

### ownerContract

```solidity
contract Owner ownerContract
```

### constructor

```solidity
constructor(address _ownerAddress) public
```

### attack

```solidity
function attack() external
```

## Owner

## TxOriginAttack

### ownerContract

```solidity
contract Owner ownerContract
```

### constructor

```solidity
constructor(address _ownerAddress) public
```

### attack

```solidity
function attack() external
```

## Auction

### Bid

```solidity
struct Bid {
  uint256 bidAmount;
  address bidder;
}
```

### BidPlaced

```solidity
event BidPlaced(address bidder, uint256 bidAmount)
```

### currentBid

```solidity
struct Auction.Bid currentBid
```

### locked

```solidity
bool locked
```

### constructor

```solidity
constructor() public
```

### placeBid

```solidity
function placeBid() external payable
```

### isHigherBid

```solidity
modifier isHigherBid()
```

## DOSAttack

### auction

```solidity
contract Auction auction
```

### constructor

```solidity
constructor(address _auction) public
```

### attack

```solidity
function attack() external payable
```

## DOSPrevention

### Bid

```solidity
struct Bid {
  uint256 bidAmount;
  address bidder;
}
```

### BidPlaced

```solidity
event BidPlaced(address bidder, uint256 bidAmount)
```

### currentBid

```solidity
struct DOSPrevention.Bid currentBid
```

### locked

```solidity
bool locked
```

### balances

```solidity
mapping(address => uint256) balances
```

### constructor

```solidity
constructor() public
```

### placeBid

```solidity
function placeBid() external payable
```

### withdraw

```solidity
function withdraw() public
```

### isHigherBid

```solidity
modifier isHigherBid()
```

## Game

### constructor

```solidity
constructor() public payable
```

### pickACard

```solidity
function pickACard() private view returns (uint256)
```

Randomly picks a number out of `0 to 2²⁵⁶–1`.

### guess

```solidity
function guess(uint256 _guess) external
```

It begins the game by first choosing a random number by calling `pickACard`
        It then verifies if the random number selected is equal to `_guess` passed by the player
        If the player guessed the correct number, it sends the player `0.1 ether`

### getBalance

```solidity
function getBalance() external view returns (uint256)
```

Returns the balance of ether in the contract

## RandomnessAttack

### game

```solidity
contract Game game
```

### constructor

```solidity
constructor(address _game) public
```

### attack

```solidity
function attack() public
```

attacks the `Game` contract by guessing the exact number because `blockhash` and `block.timestamp`
        is accessible publically

### receive

```solidity
receive() external payable
```

## DelegateCallAttack

### helper

```solidity
address helper
```

### owner

```solidity
address owner
```

### num

```solidity
uint256 num
```

### victim

```solidity
contract Victim victim
```

### constructor

```solidity
constructor(address _victim) public
```

### setNum

```solidity
function setNum(uint256 _num) external returns (bool status)
```

### attack

```solidity
function attack() external
```

## Victim

### helper

```solidity
address helper
```

### owner

```solidity
address owner
```

### num

```solidity
uint256 num
```

### constructor

```solidity
constructor(address _helper) public
```

### setNum

```solidity
function setNum(uint256 _num) external returns (bool status)
```

## Game

### constructor

```solidity
constructor() public payable
```

### pickACard

```solidity
function pickACard() private view returns (uint256)
```

Randomly picks a number out of `0 to 2²⁵⁶–1`.

### guess

```solidity
function guess(uint256 _guess) external
```

It begins the game by first choosing a random number by calling `pickACard`
        It then verifies if the random number selected is equal to `_guess` passed by the player
        If the player guessed the correct number, it sends the player `0.1 ether`

### getBalance

```solidity
function getBalance() public view returns (uint256)
```

Returns the balance of ether in the contract

