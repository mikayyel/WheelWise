import { Box, Container } from "@mui/material";
import CarCarousel from "../components/CarCarousel/CarCarousel";

function Home() {
  return (
    <Box>
      <Container sx={{ color: "white", pd: 20 }} maxWidth="lg">
        <CarCarousel />
      </Container>
    </Box>
  );
}

export default Home;
