module.exports = [
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x715018a6',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8da5cb5b',
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8f32d59b',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xf2fde38b',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'x',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'y',
        type: 'uint256',
      },
    ],
    name: 'KeyRegistered',
    type: 'event',
    signature:
      '0xe75c69e03d16578859c2d6970c59af779cdbb15064bd20fb13b8fb6d59450726',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        name: 'x',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'y',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint128',
      },
    ],
    name: 'Deposit',
    type: 'event',
    signature:
      '0x508982b75b84bc9a8a2967d1c2cba38016d566bef29221f597ce59270a3b9b47',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint128',
      },
    ],
    name: 'Withdraw',
    type: 'event',
    signature:
      '0xf7c94207a71e9e28815faa70ca42021f47a1d25c25fbec0973eb7beb92f42192',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'oldState',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'newState',
        type: 'uint256',
      },
    ],
    name: 'StateUpdated',
    type: 'event',
    signature:
      '0x210cbb60935822c957f36bfad9f082e34516b470d608565d6e21abfd2d771beb',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'oldState',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'rejectedState',
        type: 'uint256',
      },
    ],
    name: 'StateRejected',
    type: 'event',
    signature:
      '0x91def8b0fd14ae62d6671c9fccdddab96f5ac9c89c69ecfd897a1a5f9b9f33be',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
    signature:
      '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'x',
        type: 'uint256',
      },
      {
        name: 'y',
        type: 'uint256',
      },
    ],
    name: 'registerKey',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0x41a89c57',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getKey',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x93790f44',
  },
  {
    constant: true,
    inputs: [],
    name: 'getMyKey',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x9798fd6e',
  },
  {
    constant: false,
    inputs: [],
    name: 'depositEther',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0x98ea5fca',
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawEther',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0x7362377b',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_token',
        type: 'address',
      },
      {
        name: '_amount',
        type: 'uint128',
      },
    ],
    name: 'depositToken',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xad895d7e',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_token',
        type: 'address',
      },
      {
        name: '_recipient',
        type: 'address',
      },
      {
        name: '_amount',
        type: 'uint128',
      },
      {
        name: '_proof',
        type: 'uint256',
      },
      {
        name: '_newState',
        type: 'uint256',
      },
    ],
    name: 'withdrawToken',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xae9dc5e6',
  },
  {
    constant: true,
    inputs: [],
    name: 'getState',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x1865c57d',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newState',
        type: 'uint256',
      },
    ],
    name: 'setState',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xa9e966b7',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'a',
        type: 'uint256[2]',
      },
      {
        name: 'b',
        type: 'uint256[2][2]',
      },
      {
        name: 'c',
        type: 'uint256[2]',
      },
      {
        name: '_newState',
        type: 'uint256',
      },
    ],
    name: 'verifyDeposit',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x6c246285',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'setDepositVerifier',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x2c6ce78b',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'setTransferVerifier',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xec845f96',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'setWithdrawVerifier',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xb0ca3126',
  },
]
