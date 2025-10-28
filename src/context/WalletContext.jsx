import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [address, setAddress] = useState(() => {
    // Restore session from localStorage
    return localStorage.getItem('walletAddress') || null;
  });
  const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem('walletConnected') === 'true';
  });
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Session persistence
  useEffect(() => {
    if (address && isConnected) {
      localStorage.setItem('walletAddress', address);
      localStorage.setItem('walletConnected', 'true');
    } else {
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('walletConnected');
    }
  }, [address, isConnected]);

  // Check connection on mount
  useEffect(() => {
    if (isConnected && address) {
      checkConnection();
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [address]);

  const checkConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
        } else {
          disconnect();
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      setError('Failed to check wallet connection');
      disconnect();
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (provider, address) => {
    try {
      const balance = await provider.getBalance(address);
      setBalance((Number(balance) / 1e18).toFixed(4));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance');
    }
  };

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!window.ethereum) {
        setError('Please install MetaMask or another Web3 wallet');
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
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    setBalance('0');
    setError(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
  }, []);

  const refreshBalance = useCallback(async () => {
    if (provider && address) {
      await updateBalance(provider, address);
    }
  }, [provider, address]);

  const value = {
    address,
    isConnected,
    provider,
    balance,
    error,
    loading,
    connect,
    disconnect,
    refreshBalance
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
