import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import {
  Box, TextField, RadioGroup, FormControlLabel, Radio,
  Select, MenuItem, FormControl, Typography,
  InputLabel,
  Grid,
  Divider
} from "@mui/material";
import { customInputStyle, exteriorColors, menuPaperPropsStyle, selectStyle, years } from "./helpers/helpers";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeMake,
  handleChangeModel,
  handleChangeYear,
  handleChangeColor,
  handleChangeDescription,
  handleChangeCondition
} from "../../redux/sellingCar";

const CarDetailsForm = () => {
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch()
  const { make, model, year, color, condition, description } = useSelector(state => state.sellingCarSlice)

  useEffect(() => {
    const getBrands = async () => {
      try {
        const brandsCol = collection(db, "brands");
        const q = query(brandsCol, orderBy("make"));
        const brandSnapshot = await getDocs(q);
        const brandList = brandSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBrands(brandList);
      } catch (error) {
        console.error("Error fetching brands: ", error.message);
      }
    };
    getBrands();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#071620", borderRadius: "8px", color: "#fff", mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, display: "inline-block" }}>
        Car Details
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Brand</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="brand-select-label">Select option</InputLabel>
            <Select
              sx={{
                bgcolor: '#152836',
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#071620',
                }
              }}
              labelId="brand-select-label"
              id="brand-select"
              label="Select option"
              name="brand"
              value={make}
              onChange={(e) => dispatch(handleChangeMake(e.target.value))}
              MenuProps={{
                PaperProps: {
                  sx: menuPaperPropsStyle
                },
              }}
            >
              <MenuItem value="" ><em>Select option</em></MenuItem>
              {brands.map((car, i) => (
                <MenuItem key={car.make} value={car.make}>
                  {car.make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Model</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="model-select-label">Select option</InputLabel>
            <Select
              labelId="model-select-label"
              id="model-select"
              label="Select option"
              name="model"
              value={model}
              onChange={(e) => dispatch(handleChangeModel(e.target.value))}
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
              {make && brands
                .filter((car) => car.make === make)
                .flatMap((car) =>
                  car.models.map((model, i) => (
                    <MenuItem key={i} value={model}>
                      {model}
                    </MenuItem>
                  ))
                )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Year</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="year-select-label"> Select option</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              label="Select option"
              name="year"
              value={year}
              onChange={(e) => dispatch(handleChangeYear(e.target.value))}
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
              {years.map((value, i) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Exterior Color</Typography>
          <FormControl fullWidth sx={selectStyle}>
            <InputLabel id="color-select-label"> Select option</InputLabel>
            <Select
              labelId="color-select-label"
              id="color-select"
              label="Select option"
              name="exteriorColor"
              value={color}
              onChange={(e) => dispatch(handleChangeColor(e.target.value))}
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
              {exteriorColors.map((value, i) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#fff", mb: 0.5 }}>Condition</Typography>
          <RadioGroup
            row
            value={condition}
            onChange={(e) => dispatch(handleChangeCondition(e.target.value))}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="new" control={<Radio sx={{
              color: "#fff",
              "&.Mui-checked": {
                color: "#fff",
              },
            }} />} label="New" />
            <FormControlLabel value="used" control={<Radio sx={{
              color: "#fff",
              "&.Mui-checked": {
                color: "#fff",
              },
            }} />} label="Used" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ ...customInputStyle, bgcolor: "#152836", borderRadius: '4px' }}
            label="Write description about your car"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            name="description"
            value={description}
            onChange={(e) => dispatch(handleChangeDescription(e.target.value))}
          />
        </Grid>
      </Grid>
    </Box >
  );
};

export default CarDetailsForm;
