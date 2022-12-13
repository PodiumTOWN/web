const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'proposalId',
        type: 'string'
      }
    ],
    name: 'checkDeadline',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'dataKey',
        type: 'string'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'uintValue',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'stringValue',
            type: 'string'
          },
          {
            internalType: 'string[]',
            name: 'stringArrayValue',
            type: 'string[]'
          }
        ],
        internalType: 'struct PodiumContract.DataValue',
        name: 'dataValue',
        type: 'tuple'
      }
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getActiveProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'voteYesCount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'voteNoCount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'dataKey',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'uint256',
                name: 'uintValue',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'stringValue',
                type: 'string'
              },
              {
                internalType: 'string[]',
                name: 'stringArrayValue',
                type: 'string[]'
              }
            ],
            internalType: 'struct PodiumContract.DataValue',
            name: 'dataValue',
            type: 'tuple'
          }
        ],
        internalType: 'struct PodiumContract.VoteProposal[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAlgorithmData',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'uintValue',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'stringValue',
            type: 'string'
          },
          {
            internalType: 'string[]',
            name: 'stringArrayValue',
            type: 'string[]'
          }
        ],
        internalType: 'struct PodiumContract.DataValue[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'proposalId',
        type: 'string'
      }
    ],
    name: 'getProposal',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'voteYesCount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'voteNoCount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'dataKey',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'uint256',
                name: 'uintValue',
                type: 'uint256'
              },
              {
                internalType: 'string',
                name: 'stringValue',
                type: 'string'
              },
              {
                internalType: 'string[]',
                name: 'stringArrayValue',
                type: 'string[]'
              }
            ],
            internalType: 'struct PodiumContract.DataValue',
            name: 'dataValue',
            type: 'tuple'
          }
        ],
        internalType: 'struct PodiumContract.VoteProposal',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'proposalId',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: 'vote',
        type: 'bool'
      }
    ],
    name: 'voteOnProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
export default abi
