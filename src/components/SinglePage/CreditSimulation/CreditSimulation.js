import React, { useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Box, Container, InputAdornment } from '@mui/material';

const CreditSimulation = () => {
  const [price, setPrice] = useState('56690');
  const [rate, setrate] = useState('12');
  const [period, setPeriod] = useState(12);
  const [downPayment, setDownPayment] = useState('24480');

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+$/;
    if (value === '' || regex.test(value)) {
      setPrice(value);
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+(\.\d{0,2})?$/; // Allow numbers with up to 2 decimal places
    if (value === '' || regex.test(value)) {
      setrate(value);
    }
  };

  const handleDownPaymentChange = (e) => {
    const value = e.target.value;
    const regex = /^\d+$/;
    if (value === '' || regex.test(value)) {
      setDownPayment(value);
    }
  };

  const calculateMonthlyPayment = () => {
    if (price === '' || downPayment === '' || rate === '') return
    const principal = Number(price) - Number(downPayment);
    const monthlyRate = Number(rate) / 100 / 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, period);
    const denominator = Math.pow(1 + monthlyRate, period) - 1;
    return (principal * numerator / denominator).toFixed(2);
  };

  return (
    <Container maxWidth='lg' sx={{ mb: 10 }}>
      <Box sx={{ backgroundColor: '#0f1929', p: 3, borderRadius: 2, color: '#fff' }}>
        <Typography variant="h5" gutterBottom>Credit Simulation</Typography>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6} >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Price</Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={price}
                    onChange={handlePriceChange}

                    inputProps={{
                      pattern: "^[0-9]*$", // Only allows digits
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment sx={{ color: '#fff' }} position="start">$ </InputAdornment>,
                      sx: { color: '#fff' }
                    }}
                    sx={{ bgcolor: '#1c2838' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Rate (%)</Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={rate}
                    onChange={handleRateChange}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{ bgcolor: '#1c2838' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Period</Typography>
                  <TextField
                    select
                    variant="outlined"
                    fullWidth
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{ bgcolor: '#1c2838' }}
                  >
                    {[12, 24, 36, 48, 60].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option} Months
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={6} >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Down Payment</Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    InputProps={{
                      startAdornment: <InputAdornment sx={{ color: '#fff' }} position="start">$ </InputAdornment>,
                      sx: { color: '#fff' }
                    }}
                    sx={{ bgcolor: '#1c2838' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              border: '1px solid #1976d2', borderRadius: 2, p: 2,
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
              bgcolor: '#112336',
              height: '100%'
            }}>
              <Typography variant="h6">Monthly Payment</Typography>
              <Typography variant="h4" sx={{ color: '#1976d2' }}>
                ${calculateMonthlyPayment() || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreditSimulation;
