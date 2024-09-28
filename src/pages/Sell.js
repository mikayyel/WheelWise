import { Box, Container, Typography } from "@mui/material";
import Location from "../components/Location/Location";
import CarDetailsForm from "../components/CarDetailsForm/CarDetailsForm";
import CarPriceForm from "../components/CarPriceForm/CarPriceForm";
import CarFeaturesForm from "../components/CarFeaturesForm/CarFeaturesForm";
import CarEngineForm from "../components/CarEngineForm/CarEngineForm";
import CarPhotoForm from "../components/CarPhotoForm/CarPhotoForm";
import { CarSellButton } from "../components/CarSellButton/CarSellButton";

function Sell() {
  return (
    <Box sx={{ pt: 10 }}>
      <Box sx={{ bgcolor: '#12232E', mb: 10 }}>
        <Container maxWidth="lg">
          <Typography py={5} variant='h2' color={'white'} fontSize={{ xs: '40px', md: '60px' }}>
            Sell Your Car
          </Typography>
        </Container>
      </Box>
      <Container sx={{ color: "white" }} maxWidth="lg">
        <CarDetailsForm />
        <CarEngineForm />
        <CarFeaturesForm />
        <Location />
        <CarPriceForm />
        <CarPhotoForm />
        <CarSellButton />
      </Container>
    </Box>
  );
}

export default Sell;
