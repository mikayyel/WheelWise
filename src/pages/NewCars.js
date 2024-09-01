import { Box, Container, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";

function NewCars() {
  return (
    <Box sx={{ pt: 10 }}>
      <Container maxWidth='xl'>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FilterCars />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <SearchCars />
              </Grid>
              <Grid item sx={{ justifyContent: 'center' }}>
                <CarGrid />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )

}

export default NewCars