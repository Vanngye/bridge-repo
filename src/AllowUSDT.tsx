import React from 'react';

interface AllowUSDTProps {
  address?: string;
}

export const AllowUSDT: React.FC<AllowUSDTProps> = ({ address }) => {
  if (!address) {
    return <div>Please connect your wallet to allow USDT transfers.</div>;
  }

  return (
    <div>
      <h3>AllowUSDT Component</h3>
      <p>Connected Address: {address}</p>

      {/* You can add your contract interaction logic here */}
    </div>
  );
};