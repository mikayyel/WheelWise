import { Box, Container } from "@mui/material";
import RecommendedCars from "../components/RecommendedCars/RecommendedCars";
import About from "../components/About/About";
import OurService from "../components/OurService/OurService";

function Home() {
  return (
    <Box >
      <Container sx={{ color: 'white' }} maxWidth='lg' >
        This is Home
        <RecommendedCars />
      </Container>
      <About />
      <OurService />
    </Box>)
}

export default Home