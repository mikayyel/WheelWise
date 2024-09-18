import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import {
  years,
  prices,
  mileage,
  fuelType,
  transmission,
  horsepower,
  engine,
} from "./helper";
import { useEffect, useState } from "react";
import "./css/filterCars.css";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const FilterCars = ({ onFilterChange }) => {
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [fromMileage, setFromMileage] = useState("");
  const [toMileage, setToMileage] = useState("");
  const [fromHorsePower, setFromHorsePower] = useState("");
  const [toHorsePower, setToHorsePower] = useState("");
  const [fromEngine, setFromEngine] = useState("");
  const [toEngine, setToEngine] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [priceRange, setPriceRange] = useState([prices.MIN, prices.MAX]);
  const [brands, setBrands] = useState([]);

  const handleFromChangeYear = (event) => {
    setFromYear(event.target.value);
    if (toYear && event.target.value >= toYear) {
      setToYear("");
    }
  };

  const handleToChangeYear = (event) => setToYear(event.target.value);

  const handleFromChangeMileage = (event) => {
    setFromMileage(event.target.value);
    if (toMileage && event.target.value >= toMileage) {
      setToMileage("");
    }
  };

  const handleToChangeMileage = (event) => setToMileage(event.target.value);

  const handleFromChangeHorsePower = (event) => {
    setFromHorsePower(event.target.value);
    if (toHorsePower && event.target.value >= toHorsePower) {
      setToHorsePower("");
    }
  };

  const handleToChangeHorsePower = (event) =>
    setToHorsePower(event.target.value);

  const handleFromChangeEngine = (event) => {
    setFromEngine(event.target.value);
    if (toEngine && event.target.value >= toEngine) {
      setToEngine("");
    }
  };

  const handleToChangeEngine = (event) => setToEngine(event.target.value);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel("");
  };
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  const handleTransmissionChange = (event) =>
    setSelectedTransmission(event.target.value);
  const handleFuelTypeChange = (event) =>
    setSelectedFuelType(event.target.value);
  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

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

  useEffect(() => {
    const fetchFilteredCars = async () => {
      const carsCol = collection(db, "cars");
      let q = query(carsCol);

      if (fromYear) q = query(q, where("year", ">=", Number(fromYear)));
      if (toYear) q = query(q, where("year", "<=", Number(toYear)));
      if (selectedBrand) q = query(q, where("make", "==", selectedBrand));
      if (selectedModel) q = query(q, where("model", "==", selectedModel));
      if (fromMileage)
        q = query(q, where("mileage", ">=", Number(fromMileage)));
      if (toMileage) q = query(q, where("mileage", "<=", Number(toMileage)));
      if (fromEngine) q = query(q, where("engine", ">=", fromEngine));
      if (toEngine) q = query(q, where("engine", "<=", toEngine));
      if (selectedTransmission)
        q = query(q, where("transmission", "==", selectedTransmission));
      if (selectedFuelType)
        q = query(q, where("fuelType", "==", selectedFuelType));
      if (fromHorsePower)
        q = query(q, where("horsepower", ">=", Number(fromHorsePower)));
      if (toHorsePower)
        q = query(q, where("horsepower", "<=", Number(toHorsePower)));
      q = query(
        q,
        where("price", ">=", priceRange[0]),
        where("price", "<=", priceRange[1])
      );

      try {
        const querySnapshot = await getDocs(q);
        const carsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (carsList.length) onFilterChange(carsList);
      } catch (error) {
        console.error("Error fetching cars: ", error.message);
      }
    };
    fetchFilteredCars();
  }, [
    fromYear,
    toYear,
    selectedBrand,
    selectedModel,
    fromMileage,
    toMileage,
    fromEngine,
    toEngine,
    selectedTransmission,
    selectedFuelType,
    fromHorsePower,
    toHorsePower,
    priceRange,
    onFilterChange,
  ]);

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
      <div className="brand-button-group">
        <Box>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              id="brand-select-label"
            >
              Brand
            </InputLabel>
            <Select
              sx={{ color: "#ddd" }}
              labelId="brand-select-label"
              id="brand-select"
              label="Brand"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {brands.map((car, i) => (
                <MenuItem key={i} value={car.make}>
                  {car.make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      {selectedBrand && (
        <div className="model-button-group">
          <Box>
            <FormControl fullWidth>
              <InputLabel
                sx={{ color: "rgba(255, 255, 255, 1)" }}
                id="model-select-label"
              >
                Model
              </InputLabel>
              <Select
                sx={{ color: "#ddd" }}
                labelId="model-select-label"
                id="model-select"
                label="Model"
                value={selectedModel}
                onChange={handleModelChange}
              >
                {brands
                  .filter((car) => car.make === selectedBrand)
                  .flatMap((car) =>
                    car.models.map((model, i) => (
                      <MenuItem key={i} value={model}>
                        {model}
                      </MenuItem>
                    ))
                  )}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}

      <div className="year-button-group">
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Year from
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={fromYear}
              onChange={handleFromChangeYear}
              label="Year From"
            >
              {years.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Year to
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={toYear}
              onChange={handleToChangeYear}
              label="Year To"
              disabled={!fromYear}
            >
              {years
                .filter((value) => value > fromYear)
                .map((value, i) => (
                  <MenuItem key={i} value={value}>
                    {value}
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
              {transmission.map((trans, i) => (
                <MenuItem key={i} value={trans}>
                  {trans}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="mileage-button-group">
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Mileage from
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={fromMileage}
              onChange={handleFromChangeMileage}
              label="Mileage from"
            >
              {mileage.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Mileage to
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={toMileage}
              onChange={handleToChangeMileage}
              label="Mileage to"
              disabled={!fromMileage}
            >
              {mileage
                .filter((value) => value > fromMileage)
                .map((value, i) => (
                  <MenuItem key={i} value={value}>
                    {value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="engine-button-group">
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Engine from
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={fromEngine}
              onChange={handleFromChangeEngine}
              label="Engine from"
            >
              {engine.map((eng, i) => (
                <MenuItem key={i} value={eng}>
                  {eng}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Engine to
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={toEngine}
              onChange={handleToChangeEngine}
              label="Engine to"
              disabled={!fromEngine}
            >
              {engine
                .filter((value) => value > fromEngine)
                .map((value, i) => (
                  <MenuItem key={i} value={value}>
                    {value}
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
              {fuelType.map((fuel, i) => (
                <MenuItem key={i} value={fuel}>
                  {fuel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="horsepower-button-group">
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Horsepower from
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={fromHorsePower}
              onChange={handleFromChangeHorsePower}
              label="Horsepower from"
            >
              {horsepower.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ color: "rgba(255, 255, 255, 1)" }}>
              Horsepower to
            </InputLabel>
            <Select
              style={{ color: "#ddd" }}
              value={toHorsePower}
              onChange={handleToChangeHorsePower}
              label="Horsepower to"
              disabled={!fromHorsePower}
            >
              {horsepower
                .filter((value) => value > fromHorsePower)
                .map((value, i) => (
                  <MenuItem key={i} value={value}>
                    {value}
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
            setFromYear("");
            setToYear("");
            setSelectedBrand("");
            setSelectedModel("");
            setFromMileage("");
            setToMileage("");
            setFromHorsePower("");
            setToHorsePower("");
            setFromEngine("");
            setToEngine("");
            setSelectedTransmission("");
            setSelectedFuelType("");
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
