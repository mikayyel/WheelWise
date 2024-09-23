import React, { useState } from 'react';
import {
  Box, TextField, RadioGroup, FormControlLabel, Radio,
  Select, MenuItem, Button, FormControl, Typography,
  InputLabel,
  Grid
} from '@mui/material';
import { BODY_TYPES, selectStyle } from './helpers/helpers';
import { inputStyle } from '../SignIn/constants/constants';

const CarDetailsForm = () => {
  const [passengerCapacity, setPassengerCapacity] = useState(2);
  const [carCondition, setCarCondition] = useState('new');
  const [carDetails, setCarDetails] = useState({
    bodyType: '',
    brand: '',
    model: '',
    year: '',
    exteriorColor: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handlePassengerChange = (increment) => {
    setPassengerCapacity(prev => Math.max(1, prev + increment));
  };

  const handleConditionChange = (e) => {
    setCarCondition(e.target.value);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#071620', borderRadius: '8px', color: '#fff' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Car Details
      </Typography>
      <Grid container spacing={2}>

        <Grid item xs={6} md={4}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Body Type</Typography>
            <FormControl fullWidth sx={selectStyle} >
              <InputLabel
                sx={{ color: "rgba(255, 255, 255, 1)" }}
                id="bodyType-select-label"
              >
                Select option
              </InputLabel>

              <Select
                name="bodyType"
                value={carDetails.bodyType}
                onChange={handleInputChange}
                sx={{ bgcolor: '#152836' }}
                labelId="bodyType-select-label"
                id="bodyType-select"
                label="Select option"
              >
                <MenuItem value=""><em>Select option</em></MenuItem>
                {BODY_TYPES.map(type => (
                  <MenuItem key={type} value={type} >{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

        </Grid>
        <Grid item xs={6} md={4}>
          <Box>
            <FormControl fullWidth sx={selectStyle}>
              <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Brand</Typography>
              <Select
                name="brand"
                value={carDetails.brand}
                onChange={handleInputChange}
                sx={{ bgcolor: '#152836' }}
              >
                <MenuItem value=""><em>Select option</em></MenuItem>
                <MenuItem value="toyota">Toyota</MenuItem>
                <MenuItem value="honda">Honda</MenuItem>
                {/* Add more options */}
              </Select>
            </FormControl>
          </Box>

        </Grid>
        <Grid item xs={6} md={4}>
          <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <FormControl fullWidth sx={selectStyle}>
              <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Model</Typography>
              <Select
                name="model"
                value={carDetails.model}
                onChange={handleInputChange}
                sx={{ bgcolor: '#152836' }}
              >
                <MenuItem value=""><em>Select option</em></MenuItem>
                <MenuItem value="model1">Model 1</MenuItem>
                <MenuItem value="model2">Model 2</MenuItem>
                {/* Add more options */}
              </Select>
            </FormControl>
          </Box>

        </Grid>
        <Grid item xs={6} md={4}>
          <Box>
            <FormControl fullWidth sx={selectStyle}>
              <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Exterior Color</Typography>
              <Select
                name="exteriorColor"
                value={carDetails.exteriorColor}
                onChange={handleInputChange}
                sx={{ bgcolor: '#152836' }}
              >
                <MenuItem value=""><em>Select option</em></MenuItem>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="white">White</MenuItem>
                {/* Add more options */}
              </Select>
            </FormControl>
          </Box>

        </Grid>
        <Grid item xs={6} md={4}>
          <Box>
            <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Condition</Typography>
            <RadioGroup
              row
              value={carCondition}
              onChange={handleConditionChange}
              sx={{ mb: 2, color: '#fff' }}
            >
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
            </RadioGroup>
          </Box>

        </Grid>
        <Grid item xs={6} md={4}>
          <Box display="flex" gap={2} alignItems="center" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePassengerChange(-1)}
            >
              -
            </Button>
            <TextField
              value={passengerCapacity}
              variant="outlined"
              sx={{ width: 50, textAlign: 'center', bgcolor: '#152836' }}
              inputProps={{ readOnly: true }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePassengerChange(1)}
            >
              +
            </Button>
          </Box>

        </Grid>
        <Grid item xs={6} md={12}>
          <TextField
            label="Write description about your car"
            sx={{ ...inputStyle, bgcolor: '#152836' }}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            name="description"
            value={carDetails.description}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Box >
  );
};

export default CarDetailsForm;
