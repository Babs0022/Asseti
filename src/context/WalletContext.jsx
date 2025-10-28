import React, { createContext, useContext, useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { BrowserProvider } from 'ethers';

const projectId = 'YOUR_PROJECT_ID'; // Replace with your WalletConnect project ID

const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org'
};

const metadata = {
  name: 'Asseti',
  description: 'Portfolio Management on Base',
  url: 'https://asseti.app',
  icons: ['https://asseti.app/icon.png']
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [base],
  projectId,
  enableAnalytics: true
});

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const browserProvider = new BrowserProvider(window.ethereum);
        const accounts = await browserProvider.listAccounts();
        if (accounts.length > 0) {
          const signer = await browserProvider.getSigner();
          const userAddress = await signer.getAddress();
          setAddress(userAddress);
          setIsConnected(true);
          setProvider(browserProvider);
          await updateBalance(browserProvider, userAddress);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const updateBalance = async (provider, address) => {
    try {
      const balance = await provider.getBalance(address);
      setBalance((Number(balance) / 1e18).toFixed(4));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connect = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask or another Web3 wallet');
        return;
      }
      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send('eth_requestAccounts', []);
      const signer = await browserProvider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      setIsConnected(true);
      setProvider(browserProvider);
      await updateBalance(browserProvider, userAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    setBalance('0');
  };

  const value = {
    address,
    isConnected,
    provider,
    balance,
    connect,
    disconnect
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
