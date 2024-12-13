import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { tokens } from '../theme';
import Header from '../components/Header';
import LineChart from '../components/LineChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to manage total revenue dynamically and date range
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Sample revenue data (replace with actual data/API)
  const revenueData = [
    { date: '2024-01-01', revenue: 5000 },
    { date: '2024-02-01', revenue: 6000 },
    { date: '2024-03-01', revenue: 5500 },
    { date: '2024-04-01', revenue: 6200 },
    { date: '2024-05-01', revenue: 7000 },
    // More data here...
  ];

  const handleRevenueCalculation = () => {
    const filteredData = revenueData.filter(
      (item) =>
        new Date(item.date) >= new Date(startDate) &&
        new Date(item.date) <= new Date(endDate)
    );
    const total = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    setTotalRevenue(total);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        p="20px"
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        height="100%"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
              paddingBottom="10px"
              marginTop="15px"
            >
              Revenue Generated
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              ${totalRevenue.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Date Range Inputs and Button */}
        <Box display="flex" gap="20px" flexDirection="column">
          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className="h-[60px]"
            onClick={handleRevenueCalculation}
          >
            Calculate Revenue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
