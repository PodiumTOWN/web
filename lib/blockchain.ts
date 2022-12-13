import { ethers } from 'ethers'
import { v4 as uuid } from 'uuid'
import abi from './abi'

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string, provider)

interface IDataValue {
  name: string
  uintValue: number
  stringValue: string
  stringArrayValue: string[]
}

export interface IProposal {
  id: string
  name: string
  description: string
  createdAt: number
  voteYesCount: number
  voteNoCount: number
  dataKey: string
  dataValue: IDataValue
}

export interface IAlgorithmData {
  minVoteCount: number
  minUsernameLength: number
}

export const PodiumContract = new ethers.Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
  abi,
  signer
)

export async function getUsernameMinimumLength() {
  const result = await PodiumContract.getUsernameMinimumLength()
  return result.toNumber()
}

export async function getActiveProposals(): Promise<IProposal[]> {
  const result: any[] = await PodiumContract.getActiveProposals()
  return result.map((prop) => {
    return {
      id: prop.id,
      name: prop.name,
      description: prop.description,
      createdAt: prop.createdAt.toNumber(),
      voteYesCount: prop.voteYesCount.toNumber(),
      voteNoCount: prop.voteNoCount.toNumber(),
      dataKey: prop.dataKey,
      dataValue: {
        name: prop.dataKey,
        uintValue: prop.dataValue.uintValue.toNumber(),
        stringValue: prop.dataValue.stringValue,
        stringArrayValue: prop.dataValue.stringArrayValue
      }
    }
  })
}

export async function voteOnProposal(proposal: IProposal, vote: boolean) {
  try {
    await PodiumContract.voteOnProposal(proposal.id, vote)
  } catch (error) {
    throw error
  }
}

export async function getAlgorithmData(): Promise<IAlgorithmData> {
  try {
    const result = await PodiumContract.getAlgorithmData()

    return result.reduce((a: any, v: any) => {
      switch (v.name) {
        case 'minVoteCount':
          return { ...a, [v.name]: v.uintValue.toNumber() }

        case 'minUsernameLength':
          return { ...a, [v.name]: v.uintValue.toNumber() }

        default:
          return { ...a, [v.name]: v.stringValue }
      }
    }, {})
  } catch (error) {
    throw error
  }
}
