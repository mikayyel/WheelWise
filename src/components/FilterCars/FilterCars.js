import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { years, prices } from "./helper";
import { useEffect, useState } from "react";

const FilterCars = () => {
  const [cars, setCars] = useState([]);
  const [val, setVal] = useState();

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/cars")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);
  return (
    <div className="filter-field">
      <div className="filter">
        <p>
          Filter
          <div
            style={{
              width: 329,
              height: 0,
              gap: 0,
              border: "1px solid rgba(255, 255, 255, 1)",
            }}
          ></div>
        </p>
      </div>

      <div className="search-field">
        <Stack
          spacing={2}
          style={{
            background: "rgba(21, 40, 54, 1)",
          }}
        >
          <TextField label="Search" />
        </Stack>
      </div>
      <div className="year-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Year"
            >
              {years.map((year) => (
                <MenuItem value={10}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="brand-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Brand"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.make}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="model-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Model</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Model"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.model}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="mileage-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mileage</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Mileage"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="transmission-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transmission</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Transmission"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="fuel-type-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Fuel Type"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="engine-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Engine</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Engine"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="horsepower-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Horsepower</InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Horsepower"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="exterior-color-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Exterior Color
            </InputLabel>
            <Select
              sx={{ color: "rgba(215, 215, 215, 1)" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exterior Color"
            >
              <MenuItem value={10}>2019</MenuItem>
              <MenuItem value={20}>2020</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
              <MenuItem value={40}>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="price-button">
        <div>
          <ul style={{ padding: 12, margin: 4, listStyle: "none" }}>
            <li style={{ color: "#fff" }}>Price Range</li>
            <li style={{ color: "rgba(0, 124, 199, 1)" }}>
              {" "}
              $.{prices.MIN} - ${prices.MAX}
            </li>
          </ul>
        </div>

        <Box sx={{ width: 334, paddingLeft: 3 }}>
          <Slider
            prices={prices}
            step={10}
            value={val}
            valueLabelDisplay="auto"
            min={prices.MIN}
            max={prices.MAX}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              onClick={() => setVal(prices.MAX)}
              sx={{ cursor: "pointer" }}
            ></Typography>
          </Box>
        </Box>
      </div>
      <div>
        <Button
          sx={{
            width: 359,
            height: 48,
            margin: 2,
            padding: "(15 61 15 61)",
            gap: 4,
            borderradius: "(3 0 0 0)",
            border: "1px solid rgba(0, 124, 199, 1)",
            background: "rgba(21, 40, 54, 1)",
          }}
          variant="contained"
          disableElevation
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterCars;
