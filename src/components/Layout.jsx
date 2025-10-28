import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import { useWallet } from '../context/WalletContext';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, isConnected, connect, disconnect } = useWallet();

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.5rem',
              }}
            >
              ASSETI
            </Typography>

            <Tabs
              value={location.pathname}
              onChange={handleTabChange}
              sx={{ flexGrow: 1, mx: 4 }}
            >
              <Tab label="Home" value="/" />
              <Tab label="Portfolio" value="/portfolio" />
              <Tab label="Analytics" value="/analytics" />
            </Tabs>

            {isConnected ? (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {formatAddress(address)}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={disconnect}
                  sx={{ borderRadius: 2 }}
                >
                  Disconnect
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={connect}
                sx={{ borderRadius: 2 }}
              >
                Connect Wallet
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, py: 4, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 3, px: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Asseti - Portfolio Management on Base
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
