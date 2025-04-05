import './App.css';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import {
  WagmiProvider,
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
} from 'wagmi';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config';
import InputBox from './InputBox';
import { useEffect } from 'react';
import ApproveFromFrontend from './AprooveFromFrontend';
import TransferToSpender from './TransferToSpender';
import LockTokens from './LockTokens';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const client = new QueryClient();

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: 1
          }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <WalletAddressSender />

        </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
      
        <InputBox  inputValue={inputValue} setInputValue={setInputValue} />
        
        <ApproveFromFrontend amount={inputValue}/>
        <TransferToSpender amount={inputValue} />
        <LockTokens amount={inputValue}/>
      </QueryClientProvider>
      
    </WagmiProvider>
    




    </div>
  );
}

const WalletAddressSender = () => {
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    const sendAddressToBackend = async () => {
      if (!connected || !publicKey) return;

      const address = publicKey.toString();
      console.log("Connected wallet:", address);

      try {
        const res = await axios.post('http://localhost:3001/api/save-wallet', {
          address
        });
        console.log(" Sent to backend:", res.data);
      } catch (err) {
        console.error(" Error sending address:", err);
      }
    };

    sendAddressToBackend();
  }, [connected, publicKey]);

  return null; 
};

export default App;