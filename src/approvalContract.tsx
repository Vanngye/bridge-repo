import * as React from 'react'
import { useWriteContract } from 'wagmi'
 
export function AllowUSDT() {
  const { data: hash, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    writeContract({
      address: '0x000f3580bd2D098B977F323A4E9083552e33556B',
      abi: [{
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
      ],
      functionName: 'approve',
      args: ["0xc5380c057E3678105E61Ecea917fC826dAC9feCC", BigInt(1)],
    })
  } 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Approve</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
} 