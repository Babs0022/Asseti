import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletConnectButton = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="wallet-connect-button">
      {!account ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
