import { Box, Container } from "@mui/material";
import RecommendedCars from "../components/RecommendedCars/RecommendedCars";
import About from "../components/About/About";
import OurService from "../components/OurService/OurService";
import CarCarousel from "../components/CarCarousel/CarCarousel";

function Home() {
  return (
    <Box>
      <Container sx={{ color: "white", pd: 20 }} maxWidth="lg">
        <CarCarousel />
      </Container>
      <About />
      <OurService />
    </Box>
  );
}

export default Home;
