import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import React from 'react';

// Extend window.ethereum so TypeScript doesn't complain
declare global {
  interface Window {
    ethereum?: any;
  }
}

const tokenAddress = '0x7EC3fff7eFeFf9D098dF180488260C2d7ab2De4D';
const spender = '0x803f3546bEb3897B2550321b3037C4736002E27D';

const abi = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 👇 Define props interface
interface Props {
  amount: string; // should be a string like "10"
}

const ApproveFromFrontend: React.FC<Props> = ({ amount }) => {
  const { address } = useAccount();

  const approve = async () => {
    if (!window.ethereum || !address) {
      alert("Please connect wallet");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, abi, signer);

      // ✅ Convert string to BigInt with correct decimals
      const parsedAmount = ethers.parseUnits(amount, 18);

      const tx = await contract.approve(spender, parsedAmount);
      console.log('📤 Approve TX sent:', tx.hash);

      await tx.wait();
      alert(`✅ Approved ${amount} tokens to ${spender}. TX: ${tx.hash}`);
    } catch (err: any) {
      console.error("❌ Error approving:", err.message);
      alert("Transaction failed or rejected");
    }
  };

  return (
    <div>
      <button onClick={approve} disabled={!address}>
        Approve {amount || '0'} Tokens
      </button>
    </div>
  );
};

export default ApproveFromFrontend;