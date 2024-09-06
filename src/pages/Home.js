import { Box, Container, Typography } from "@mui/material";
import About from "../components/About/About";
import OurService from "../components/OurService/OurService";
import CarCarousel from "../components/CarCarousel/CarCarousel";
import ContactSection from "../components/ContactSection/ContactSection";
import Partners from "../components/Partners/Partners";
import Title from "../components/CustomComponents/Title";
import imageSrc from "../img/Rectangle110.png";

function Home() {
  return (
    <Box>
      <Container sx={{ color: "white" }} maxWidth="lg">
        <Box sx={{ py: 10 }}>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Recommended Cars
          </Typography>
          <CarCarousel />
        </Box>
      </Container>
      <About title={<Title />} imageSrc={imageSrc} />
      <OurService />
      <ContactSection />
      <Partners />
    </Box>
  );
}

export default Home;
