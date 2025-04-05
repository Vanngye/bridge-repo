import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import React from 'react';

const tokenAddress = '0x7EC3fff7eFeFf9D098dF180488260C2d7ab2De4D';
const recipient = '0x803f3546bEb3897B2550321b3037C4736002E27D';

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
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface Props {
  amount: string;
}

const TransferToSpender: React.FC<Props> = ({ amount }) => {
  const { address } = useAccount();

  const handleTransfer = async () => {
    if (!window.ethereum || !address) {
      alert('Wallet not connected');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, abi, signer);

      const parsedAmount = ethers.parseUnits(amount, 18); // 18 decimal token

      const tx = await contract.transfer(recipient, parsedAmount);
      console.log(' Transfer TX sent:', tx.hash);

      await tx.wait();
      alert(` Transferred ${amount} tokens to ${recipient} — TX: ${tx.hash}`);
    } catch (err: any) {
      console.error(' Error during transfer:', err.message);
      alert('Transfer failed or rejected');
    }
  };

  return (
    <div>
      <button onClick={handleTransfer} disabled={!address}>
        Transfer {amount || '0'} Tokens to Contract
      </button>
    </div>
  );
};

export default TransferToSpender;