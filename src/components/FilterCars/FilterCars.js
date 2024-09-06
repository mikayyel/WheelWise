import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { years, prices, mileage, fuelType } from "./helper";
import { useEffect, useState } from "react";
import "./css/filterCars.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const FilterCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMileage, setSelectedMileage] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedHorsePower, setSelectedHorsePower] = useState("");
  const [priceRange, setPriceRange] = useState([prices.MIN, prices.MAX]);

  useEffect(() => {
    async function getCars() {
      try {
        const carsCol = collection(db, "cars");
        const carSnapshot = await getDocs(carsCol);
        setCars(
          carSnapshot.docs.map((car) => ({
            id: car.id,
            ...car.data(),
          }))
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getCars();
  }, []);

  useEffect(() => {
    setFilteredCars(
      cars.filter(
        (car) =>
          (!selectedYear || car.year === selectedYear) &&
          (!selectedBrand || car.make === selectedBrand) &&
          (!selectedModel || car.model === selectedModel) &&
          (!selectedMileage || car.mileage === selectedMileage) &&
          (!selectedTransmission ||
            car.transmission === selectedTransmission) &&
          (!selectedFuelType || car.fuelType === selectedFuelType) &&
          (!selectedEngine || car.engine === selectedEngine) &&
          (!selectedColor || car.color === selectedColor) &&
          (!selectedHorsePower || car.horsepower === selectedHorsePower) &&
          car.price >= priceRange[0] &&
          car.price <= priceRange[1]
      )
    );
  }, [
    cars,
    selectedYear,
    selectedBrand,
    selectedModel,
    selectedMileage,
    selectedTransmission,
    selectedFuelType,
    selectedEngine,
    selectedColor,
    selectedHorsePower,
    priceRange,
  ]);

  const handleYearChange = (event) => setSelectedYear(event.target.value);
  const handleBrandChange = (event) => setSelectedBrand(event.target.value);
  const handleModelChange = (event) => setSelectedModel(event.target.value);
  const handleMileageChange = (event) => setSelectedMileage(event.target.value);
  const handleTransmissionChange = (event) =>
    setSelectedTransmission(event.target.value);
  const handleFuelTypeChange = (event) =>
    setSelectedFuelType(event.target.value);
  const handleEngineChange = (event) => setSelectedEngine(event.target.value);
  const handleColorChange = (event) => setSelectedColor(event.target.value);
  const handleHorsePowerChange = (event) =>
    setSelectedHorsePower(event.target.value);

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const uniqueBrands = [...new Set(cars.map((car) => car.make))];
  const uniqueModels = [...new Set(cars.map((car) => car.model))];
  const uniqueTransmissions = [...new Set(cars.map((car) => car.transmission))];
  const uniqueEngines = [...new Set(cars.map((car) => car.engine))];
  const uniqueColors = [...new Set(cars.map((car) => car.color))];
  const uniqueHorsePowers = [...new Set(cars.map((car) => car.horsepower))];

  return (
    <div className="filter-field">
      <div className="filter">
        <p>Filter</p>
        <div
          style={{
            maxWidth: "100%",
            height: 0,
            border: "1px solid rgba(255, 255, 255, 1)",
            marginTop: "10px",
          }}
        ></div>
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
              value={selectedYear}
              onChange={handleYearChange}
            >
              {years.map((year, i) => (
                <MenuItem key={i} value={year}>
                  {year}
                </MenuItem>
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
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {uniqueBrands.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedModel}
              onChange={handleModelChange}
            >
              {uniqueModels.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedMileage}
              onChange={handleMileageChange}
            >
              {mileage.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedTransmission}
              onChange={handleTransmissionChange}
            >
              {uniqueTransmissions.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedFuelType}
              onChange={handleFuelTypeChange}
            >
              {fuelType.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedEngine}
              onChange={handleEngineChange}
            >
              {uniqueEngines.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedHorsePower}
              onChange={handleHorsePowerChange}
            >
              {uniqueHorsePowers.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
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
              value={selectedColor}
              onChange={handleColorChange}
            >
              {uniqueColors.map((car, i) => (
                <MenuItem key={i} value={i}>
                  {car}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div style={{ padding: 16, margin: 4, fontFamily: "lato" }}>
        <h4 style={{ color: "#fff" }}>Price Range</h4>
        <p style={{ color: "rgba(0, 124, 199, 1)", fontSize: 17 }}>
          {" "}
          $.{prices.MIN} - ${prices.MAX}
        </p>
      </div>

      <Box sx={{ width: "100%", pl: 4, pr: 4 }}>
        <Slider
          prices={prices}
          onChange={handlePriceChange}
          value={priceRange}
          valueLabelDisplay="auto"
          min={prices.MIN}
          max={prices.MAX}
        />
      </Box>

      <div style={{ padding: "16px" }}>
        <Button
          sx={{
            height: 48,
            gap: 4,
            borderradius: "(3 0 0 0)",
            border: "1px solid rgba(0, 124, 199, 1)",
            background: "rgba(21, 40, 54, 1)",
          }}
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => {
            setSelectedYear("");
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedMileage("");
            setSelectedTransmission("");
            setSelectedFuelType("");
            setSelectedEngine("");
            setSelectedColor("");
            setSelectedHorsePower("");
            setPriceRange([prices.MIN, prices.MAX]);
          }}
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterCars;
