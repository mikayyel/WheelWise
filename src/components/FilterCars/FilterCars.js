import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
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
              border: "1px solid rgba(255, 255, 255, 1)",
            }}
          ></div>
        </p>
      </div>

      <div className="year-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Year
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Year"
            >
              {years.map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="brand-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Brand
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
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
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Model
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
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
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Mileage
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Mileage"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.mileage}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="transmission-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Transmission
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Transmission"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.transmission}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="fuel-type-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Fuel Type
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Fuel Type"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.fuelType}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="engine-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Engine
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Engine"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.engine}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="horsepower-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Horsepower
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Horsepower"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.horsepower}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="exterior-color-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="demo-simple-select-label"
            >
              Exterior Color
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Exterior Color"
            >
              {cars.map((car) => (
                <MenuItem value={car.id}>{car.color}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="price-button">
        <div>
          <ul style={{ padding: 16, margin: 4, listStyle: "none" }}>
            <li style={{ color: "#fff" }}>Price Range</li>
            <li style={{ color: "rgba(0, 124, 199, 1)" }}>
              {" "}
              $.{prices.MIN} - ${prices.MAX}
            </li>
          </ul>
        </div>

        <Box sx={{ width: 359, paddingLeft: 4 }}>
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
