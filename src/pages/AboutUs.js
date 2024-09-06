import { Box, Container, Typography } from "@mui/material";
import OurService from "../components/OurService/OurService";
import About from "../components/About/About";
import Partners from "../components/Partners/Partners";
import imageSrc from '../img/imgforaboutuspage.png'
import aboutUs from '../img/aboutus.png'
import Title from "../components/CustomComponents/Title";

function AboutUs() {

  return (
    <Box pt={10}>
      <Container sx={{ color: 'white' }} maxWidth='lg' >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Title />
          <Typography sx={{ width: { xs: '100%', md: '45%' }, textAlign: 'center', mb: 5 }} >
            Welcome to WheelWise! Simplify buying and selling cars with our user-friendly platform. Enjoy advanced search filters, detailed listings, and secure transactions. With a sleek design and easy navigation, WheelWise makes car trading seamless and efficient.
          </Typography>
          <Typography sx={{ border: '2px solid #4DA8DA', p: 1, borderRadius: '3px', mb: 5 }}>
            September, 09 2024
          </Typography>
        </Box>
        <img style={{ maxWidth: '100%' }} src={aboutUs} alt="..." />
      </Container>
      <OurService />
      <About imageSrc={imageSrc} />
      <Partners />
    </Box>)
}

export default AboutUs