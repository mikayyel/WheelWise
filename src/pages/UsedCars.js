import { Box, Container, Drawer, Grid } from "@mui/material";
import FilterCars from "../components/FilterCars/FilterCars";
import SearchCars from "../components/SearchCars/SearchCars";
import CarGrid from "../components/CarGrid/CarGrid";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function UsedCars() {
  const [usedCars, setUsedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    async function getUsedCars() {
      try {
        const carsCol = collection(db, "cars");
        const carSnapshot = await getDocs(carsCol);
        setUsedCars(
          carSnapshot.docs
            .map((car) => ({
              id: car.id,
              ...car.data(),
            }))
            .filter((car) => car.owners > 1)
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getUsedCars();
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
                  setOpenFilter={setOpenFilter}
                  handleSearch={handleSearch} />
              </Grid>
              <Grid item sx={{ justifyContent: "center" }}>
                <CarGrid cars={usedCars} searchTerm={searchTerm} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UsedCars;
