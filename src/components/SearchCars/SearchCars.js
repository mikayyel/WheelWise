import { FormControl, OutlinedInput } from "@mui/material";
import React from "react";
import "./css/searchCars.css";

const SearchCars = ({handleSearch}) => {
  return (
    <div className="car-list">
      <div className="search-cars">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              sx={{ color: "rgba(255, 255, 255, 1)" }}
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default SearchCars;
