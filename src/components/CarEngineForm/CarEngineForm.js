import {
  Box, TextField, Select, MenuItem, FormControl, Typography,
  InputLabel, Grid, Divider, InputAdornment
} from "@mui/material";
import { fuelTypes, transmissions } from "./helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeFuelType,
  handleChangeMileage,
  handleChangeTransmission,
  handleChangeEngine,
  handleChangeHorsePower
} from "../../redux/sellingCar";
import { customInputStyle, menuPaperPropsStyle, selectStyle } from "../CarDetailsForm/helpers/helpers";

const CarEngineForm = () => {
  const dispatch = useDispatch()
  const { fuelType, mileage, transmission, engine, horsepower } = useSelector(state => state.sellingCarSlice)

  const handleChange = (e) => {
    const value = e.target.value;
    const type = e.target.name
    const regex = /^\d+(\.\d{0,2})?$/; // Allow numbers with up to 2 decimal places
    if (value === '' || regex.test(value)) {
      switch (type) {
        case "mileage":
          dispatch(handleChangeMileage(value))
          break;
        case "engine":
          dispatch(handleChangeEngine(value))
          break
        case "horsepower":
          dispatch(handleChangeHorsePower(value))
          break
        default:
          break;
      }
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#071620", borderRadius: "8px", color: "#fff", mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, display: "inline-block" }}>
        Engine Details
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Fuel Type</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="fuelType-select-label">Select option</InputLabel>
            <Select
              sx={{
                bgcolor: '#152836',
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#071620',
                }
              }}
              labelId="fuelType-select-label"
              id="fuelType-select"
              label="Select option"
              name="fuelType"
              value={fuelType}
              onChange={(e) => dispatch(handleChangeFuelType(e.target.value))}
              MenuProps={{
                PaperProps: {
                  sx: menuPaperPropsStyle
                },
              }}
            >
              <MenuItem value="" ><em>Select option</em></MenuItem>
              {fuelTypes.map(fuel => (
                <MenuItem key={fuel} value={fuel}>
                  {fuel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Transmission</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="transmission-select-label">Select option</InputLabel>
            <Select
              labelId="transmission-select-label"
              id="transmission-select"
              label="Select option"
              name="transmission"
              value={transmission}
              onChange={(e) => dispatch(handleChangeTransmission(e.target.value))}
              sx={{
                bgcolor: '#152836',
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#071620',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: menuPaperPropsStyle
                },
              }}
            >
              <MenuItem value=""><em>Select option</em></MenuItem>
              {transmissions.map(current => (
                <MenuItem key={current} value={current}>
                  {current}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Mileage</Typography>
          <TextField
            variant="outlined"
            name="mileage"
            fullWidth
            value={mileage}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{ '.css-1pnmrwp-MuiTypography-root': { color: '#fff' } }}
                  position="start">km
                </InputAdornment>)
            }}
            sx={{ ...customInputStyle, bgcolor: '#152836', borderRadius: '4px' }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Engine Capacity</Typography>
          <TextField
            variant="outlined"
            name="engine"
            fullWidth
            value={engine}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{ '.css-1pnmrwp-MuiTypography-root': { color: '#fff' } }}
                  position="start">cc
                </InputAdornment>)
            }}
            sx={{ ...customInputStyle, bgcolor: '#152836', borderRadius: '4px' }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Horsepower</Typography>
          <TextField
            variant="outlined"
            name="horsepower"
            fullWidth
            value={horsepower}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{ '.css-1pnmrwp-MuiTypography-root': { color: '#fff' } }}
                  position="start">hp
                </InputAdornment>)
            }}
            sx={{ ...customInputStyle, bgcolor: '#152836', borderRadius: '4px' }}
          />
        </Grid>

      </Grid>
    </Box >
  );
};

export default CarEngineForm;