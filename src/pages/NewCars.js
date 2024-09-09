import { Box, Container, Drawer, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function NewCars() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    async function getCars() {
      try {
        const carsCol = collection(db, "cars");
        const carSnapshot = await getDocs(carsCol);
        setCars(
          carSnapshot.docs
            .map((car) => ({
              id: car.id,
              ...car.data(),
            }))
            .filter((car) => car.owners < 2)
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getCars();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <Box sx={{ pt: 15 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Drawer sx={{
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: { xs: '80%', sm: '60%', md: '80%' },
              },
            }}
              open={openFilter}
              onClose={() => setOpenFilter(false)}>
              <Box role="presentation" onClick={() => setOpenFilter(false)}>
                <FilterCars />
              </Box>
            </Drawer>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <FilterCars />
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
                <CarGrid cars={cars} searchTerm={searchTerm} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewCars;