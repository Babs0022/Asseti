import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { AccountBalanceWallet, TrendingUp, Analytics as AnalyticsIcon } from '@mui/icons-material';
import { useWallet } from '../context/WalletContext';

const Home = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  const features = [
    {
      icon: <AccountBalanceWallet sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Wallet Management',
      description: 'Connect your wallet and manage your Base assets seamlessly',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'Portfolio Tracking',
      description: 'Monitor your portfolio performance and asset allocation in real-time',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Visualize your portfolio with interactive charts and insights',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #0052FF 0%, #00D4FF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Asseti
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: '600px',
          }}
        >
          Your comprehensive portfolio management solution on Base Network
        </Typography>

        {!isConnected && (
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'warning.main',
              p: 2,
              bgcolor: 'rgba(255, 152, 0, 0.1)',
              borderRadius: 2,
            }}
          >
            Connect your wallet to get started
          </Typography>
        )}

        {isConnected && (
          <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/portfolio')}
              sx={{ borderRadius: 2, px: 4 }}
            >
              View Portfolio
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/analytics')}
              sx={{ borderRadius: 2, px: 4 }}
            >
              View Analytics
            </Button>
          </Box>
        )}

        <Grid container spacing={4} sx={{ mt: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  bgcolor: 'background.paper',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
