import { FormControl, OutlinedInput } from "@mui/material";
import React from "react";
import './css/searchCars.css'

const SearchCars = () => {
  return (
    <div className="car-list">
      <div className="search-cars">
        <form noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              placeholder="Search"
            />
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default SearchCars;
