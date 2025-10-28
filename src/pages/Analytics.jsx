import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Refresh } from '@mui/icons-material';
import { useWallet } from '../context/WalletContext';

const Analytics = () => {
  const { isConnected, address, error } = useWallet();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Placeholder function to fetch analytics data
  const fetchAnalyticsData = async () => {
    if (!isConnected || !address) return;

    setLoading(true);
    setFetchError(null);

    try {
      // TODO: Replace with actual Base blockchain analytics API calls
      // This would include:
      // - Historical price data from DEXs (Uniswap, Aerodrome)
      // - Transaction history from Base block explorer
      // - Portfolio value calculation over time
      // - Token distribution analysis
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data for portfolio allocation
      const allocationData = [
        { name: 'ETH', value: 4250, percentage: 19.5 },
        { name: 'USDC', value: 10000, percentage: 45.9 },
        { name: 'DAI', value: 5500, percentage: 25.2 },
        { name: 'AERO', value: 2125, percentage: 9.4 },
      ];

      // Mock data for performance over time
      const performanceData = [
        { date: 'Jan', value: 18500 },
        { date: 'Feb', value: 19200 },
        { date: 'Mar', value: 20100 },
        { date: 'Apr', value: 19800 },
        { date: 'May', value: 21000 },
        { date: 'Jun', value: 21875 },
      ];

      // Mock data for monthly transactions
      const transactionData = [
        { month: 'Jan', deposits: 5200, withdrawals: 3400 },
        { month: 'Feb', deposits: 4800, withdrawals: 4200 },
        { month: 'Mar', deposits: 6100, withdrawals: 3800 },
        { month: 'Apr', deposits: 5500, withdrawals: 4900 },
        { month: 'May', deposits: 6800, withdrawals: 4200 },
        { month: 'Jun', deposits: 7200, withdrawals: 5100 },
      ];

      setAnalyticsData({
        allocation: allocationData,
        performance: performanceData,
        transactions: transactionData,
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setFetchError('Failed to fetch analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics data when wallet connects
  useEffect(() => {
    if (isConnected) {
      fetchAnalyticsData();
    } else {
      setAnalyticsData(null);
    }
  }, [isConnected, address]);

  const COLORS = ['#0052FF', '#00D4FF', '#4CAF50', '#FFC107'];

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
          Please connect your wallet to view analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Connect to see your portfolio performance and insights
        </Typography>
      </Box>
    );
  }

  if (loading && !analyticsData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Portfolio Analytics
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchAnalyticsData}
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

      {analyticsData && (
        <Grid container spacing={3}>
          {/* Portfolio Allocation Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Asset Allocation
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.allocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.allocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Asset Distribution Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Asset Value Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.allocation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0052FF" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Portfolio Performance Line Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Portfolio Value Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0052FF"
                      strokeWidth={2}
                      dot={{ fill: '#0052FF' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Transaction Activity Bar Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Transaction Activity
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.transactions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deposits" fill="#4CAF50" />
                    <Bar dataKey="withdrawals" fill="#FF5252" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Analytics;
