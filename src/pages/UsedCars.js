import { Box, Container, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";
import { useState } from "react";

function UsedCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsedCars, setFilteredUsedCars] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filtered) => {
    setFilteredUsedCars(filtered.filter((car) => car.owners > 1));
  };
  return (
    <Box sx={{ pt: 10 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FilterCars onFilterChange={handleFilterChange} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <SearchCars handleSearch={handleSearch} />
              </Grid>
              <Grid item sx={{ justifyContent: "center" }}>
                <CarGrid cars={filteredUsedCars} searchTerm={searchTerm} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UsedCars;
