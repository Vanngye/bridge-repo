import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import React from 'react';

const contractAddress = '0x803f3546bEb3897B2550321b3037C4736002E27D';
const tokenAddress = '0x7EC3fff7eFeFf9D098dF180488260C2d7ab2De4D';

const lockAbi = [
  {
    "inputs": [
      { "internalType": "contract IERC20", "name": "_tokenAddress", "type": "address" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "lock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 👇 Props interface
interface Props {
  amount: string; // amount from input, as string
}

const LockTokens: React.FC<Props> = ({ amount }) => {
  const { address } = useAccount();

  const handleLock = async () => {
    if (!window.ethereum || !address) {
      alert("Connect wallet first");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, lockAbi, signer);

      const parsedAmount = ethers.parseUnits(amount, 18); // 18 decimals

      const tx = await contract.lock(tokenAddress, parsedAmount);
      console.log("📤 Lock TX sent:", tx.hash);
      await tx.wait();

      alert(`✅ Locked ${amount} tokens. TX: ${tx.hash}`);
    } catch (err: any) {
      console.error("❌ Lock failed:", err.message);
      alert("Transaction failed or rejected");
    }
  };

  return (
    <div>
      <button onClick={handleLock} disabled={!address}>
        Lock {amount || '0'} Tokens in Bridge Contract
      </button>
    </div>
  );
};

export default LockTokens;