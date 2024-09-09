import { Box, Button, Container, Typography } from "@mui/material";
import About from "../components/About/About";
import OurService from "../components/OurService/OurService";
import CarCarousel from "../components/CarCarousel/CarCarousel";
import ContactSection from "../components/ContactSection/ContactSection";
import Partners from "../components/Partners/Partners";
import Title from "../components/CustomComponents/Title";
import imageSrc from "../img/Rectangle110.png";
import homepageImgSrc from '../img/homepage.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Home() {
  return (
    <Box>
      <Box sx={{
        background: `url(${homepageImgSrc}) 0 0 / cover no-repeat`,
        height: '100vh',
        display: 'flex',
        color: 'white',
        pt: 20
      }}>
        <Container maxWidth="lg">

          <Typography sx={{ mb: 1 }} variant="h2" >Find Your Dream Car</Typography>
          <Typography sx={{ mb: 5 }} variant="h5" >Drive Smart, Trade Wise – With WheelWise.</Typography>
          <Button
            onClick={() => window.scrollBy(0, window.innerHeight)}
            sx={{
              color: 'white',
              bgcolor: '#101528',
              px: 5,
              py: 1.5,
              width: { xs: '100%', md: 'auto' }
            }}>
            View More<ArrowRightAltIcon fontSize="large" sx={{ pl: 1 }} />
          </Button>
        </Container>
      </Box>
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
