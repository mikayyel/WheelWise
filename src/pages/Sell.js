import { Box, Container } from "@mui/material";
import Location from "../components/Location/Location";
import CarDetailsForm from "../components/CarDetailsForm/CarDetailsForm";

function Sell() {
  return (
    <Box sx={{ pt: 20 }}>
      <Container sx={{ color: "white" }} maxWidth="lg">
        <CarDetailsForm />
        <Location />
      </Container>
    </Box>
  );
}

export default Sell;
