import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import "./css/searchCars.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const SearchCars = ({ handleSearch, setOpenFilter }) => {
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
        <IconButton onClick={() => setOpenFilter(true)} sx={{ width: '15%', display: { md: 'none' } }}>
          <FilterAltIcon sx={{ color: 'white' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchCars;