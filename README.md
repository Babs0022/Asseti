# Asseti

A dashboard tool for monitoring Base blockchain assets with WalletConnect authentication.

## Project Purpose

Asseti is designed to provide users with a comprehensive dashboard for tracking and monitoring their assets on the Base blockchain. The platform leverages WalletConnect to enable secure, decentralized authentication, allowing users to connect their Web3 wallets and view real-time asset data.

### Key Features
- Real-time asset monitoring on Base blockchain
- Secure authentication via WalletConnect
- User-friendly dashboard interface
- Portfolio tracking and analytics

## Basic Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- A Web3 wallet compatible with WalletConnect (e.g., MetaMask, Rainbow, Trust Wallet)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Babs0022/Asseti.git
   cd Asseti
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Base RPC endpoint and WalletConnect project ID.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Configuration

Create a `.env` file in the root directory with the following variables:
```
BASE_RPC_URL=your_base_rpc_url
WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.
