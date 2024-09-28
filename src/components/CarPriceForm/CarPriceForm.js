import { Box, TextField, Typography, Divider, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangePrice } from '../../redux/sellingCar';
import { customInputStyle } from '../CarDetailsForm/helpers/helpers';

const CarPriceForm = () => {
  const dispatch = useDispatch()
  const { price } = useSelector(state => state.sellingCarSlice)

  const handlePriceChange = (e) => {
    const value = +e.target.value;
    const regex = /^\d+$/;
    if (value === '' || regex.test(value)) {
      dispatch(handleChangePrice(value));
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#071620', borderRadius: '8px', color: '#fff', mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, display: 'inline-block' }}>
        Price
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>

      <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Full Price</Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={price}
        onChange={handlePriceChange}
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ '.css-1pnmrwp-MuiTypography-root': { color: '#fff', fontSize: '20px' } }}
              position="start">$
            </InputAdornment>)
        }}
        sx={{ ...customInputStyle, bgcolor: '#152836', borderRadius: '4px' }}
      />
    </Box >
  );
};

export default CarPriceForm;
