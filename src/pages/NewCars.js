import { Box, Container, Drawer, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";
import PaginationControl from "../components/Pagination/Pagination";
import { useCallback, useState } from "react";

function NewCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNewCars, setFilteredNewCars] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(1)
  const itemsPerPage = 10;

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = useCallback((filtered) => {
    setFilteredNewCars(filtered.filter((car) => car.owners < 2));
    setPage(1)
  }, [setFilteredNewCars])

  const paginatedCars = filteredNewCars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ pt: 15 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Drawer
              sx={{
                display: { md: 'none' },
                "& .MuiDrawer-paper": {
                  width: { xs: "80%", sm: "60%", md: "80%" },
                },
              }}
              open={openFilter}
              onClose={() => setOpenFilter(false)}
            >
              <Box role="presentation" onClick={(e) => e.stopPropagation()}>
                <FilterCars onFilterChange={handleFilterChange} />
              </Box>
            </Drawer>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <FilterCars onFilterChange={handleFilterChange} />
            </Box>
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
                <CarGrid cars={paginatedCars} searchTerm={searchTerm} />
              </Grid>
              <Grid item>
                <PaginationControl
                  page={page}
                  setPage={setPage}
                  totalCars={filteredNewCars.length}
                  itemsPerPage={itemsPerPage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewCars;
