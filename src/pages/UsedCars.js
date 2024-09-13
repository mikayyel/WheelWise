import { Box, Container, Drawer, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";
import { useCallback, useState } from "react";

function UsedCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsedCars, setFilteredUsedCars] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = useCallback((filtered) => {
    setFilteredUsedCars(filtered.filter((car) => car.owners > 1));
  }, []);
  return (
    <Box sx={{ pt: 15 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {openFilter ? (
              <Drawer
                sx={{
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: { xs: "80%", sm: "60%", md: "80%" },
                  },
                }}
                open={openFilter}
                onClose={() => setOpenFilter(false)}
              >
                <Box role="presentation" onClick={() => setOpenFilter(false)}>
                  <FilterCars onFilterChange={handleFilterChange} />
                </Box>
              </Drawer>
            ) : (
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <FilterCars onFilterChange={handleFilterChange} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <SearchCars
                  handleSearch={handleSearch}
                  setOpenFilter={setOpenFilter}
                />
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
