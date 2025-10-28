import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { TrendingUp, TrendingDown, Refresh } from '@mui/icons-material';
import { useWallet } from '../context/WalletContext';

const Portfolio = () => {
  const { isConnected, balance, address, provider, error, refreshBalance } = useWallet();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Placeholder function to fetch assets from Base blockchain
  const fetchAssets = async () => {
    if (!isConnected || !address || !provider) return;

    setLoading(true);
    setFetchError(null);

    try {
      // TODO: Replace with actual Base blockchain API calls
      // This is placeholder logic that simulates fetching assets
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock portfolio data for Base assets
      // In production, this would fetch from:
      // - Base RPC endpoints
      // - Alchemy/Infura API
      // - Token balance queries via ethers.js
      const mockAssets = [
        {
          id: 1,
          symbol: 'ETH',
          name: 'Ethereum',
          balance: balance || '0',
          value: `$${(parseFloat(balance || 0) * 1700).toFixed(2)}`,
          change: '+5.2%',
          positive: true,
          icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
          contractAddress: '0x0000000000000000000000000000000000000000',
        },
        {
          id: 2,
          symbol: 'USDC',
          name: 'USD Coin',
          balance: '10,000',
          value: '$10,000.00',
          change: '0.0%',
          positive: true,
          icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
          contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        },
        {
          id: 3,
          symbol: 'DAI',
          name: 'Dai',
          balance: '5,500',
          value: '$5,500.00',
          change: '+0.1%',
          positive: true,
          icon: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
          contractAddress: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
        },
        {
          id: 4,
          symbol: 'AERO',
          name: 'Aerodrome',
          balance: '1,250',
          value: '$2,125.00',
          change: '+12.5%',
          positive: true,
          icon: 'https://via.placeholder.com/40',
          contractAddress: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
        },
      ];

      setAssets(mockAssets);
    } catch (err) {
      console.error('Error fetching assets:', err);
      setFetchError('Failed to fetch portfolio assets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch assets when wallet connects
  useEffect(() => {
    if (isConnected) {
      fetchAssets();
    } else {
      setAssets([]);
    }
  }, [isConnected, address]);

  const totalValue = assets.reduce((sum, asset) => {
    return sum + parseFloat(asset.value.replace(/[$,]/g, ''));
  }, 0);

  const handleRefresh = async () => {
    await refreshBalance();
    await fetchAssets();
  };

  if (!isConnected) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Please connect your wallet to view your portfolio
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Connect your wallet to see your Base assets
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Portfolio Dashboard
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {fetchError && (
        <Alert severity="warning" sx={{ mb: 3 }} onClose={() => setFetchError(null)}>
          {fetchError}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Portfolio Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Wallet Balance (ETH)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {balance} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Assets
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {assets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Your Assets on Base
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : assets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body1" color="text.secondary">
                No assets found in your wallet
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">24h Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow
                      key={asset.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={asset.icon}
                            sx={{ width: 32, height: 32 }}
                          />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {asset.symbol}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {asset.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">{asset.balance}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {asset.value}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          icon={
                            asset.positive ? (
                              <TrendingUp fontSize="small" />
                            ) : (
                              <TrendingDown fontSize="small" />
                            )
                          }
                          label={asset.change}
                          color={asset.positive ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Portfolio;
