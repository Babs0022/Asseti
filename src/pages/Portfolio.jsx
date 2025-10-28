import React from 'react';
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
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { useWallet } from '../context/WalletContext';

const Portfolio = () => {
  const { isConnected, balance } = useWallet();

  // Mock portfolio data for Base assets
  const portfolioData = [
    {
      id: 1,
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '2.5',
      value: '$4,250.00',
      change: '+5.2%',
      positive: true,
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
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
    },
  ];

  const totalValue = portfolioData.reduce((sum, asset) => {
    return sum + parseFloat(asset.value.replace(/[$,]/g, ''));
  }, 0);

  if (!isConnected) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Please connect your wallet to view your portfolio
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Portfolio Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main' }}>
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
                {portfolioData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Your Assets on Base
          </Typography>

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
                {portfolioData.map((asset) => (
                  <TableRow
                    key={asset.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={asset.icon} sx={{ width: 32, height: 32 }} />
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Portfolio;
