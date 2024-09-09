import { Box, Container } from "@mui/material";
import Location from "../components/Location/Location";

function Sell() {
  return (
    <Box sx={{ backgroundImage: "url(../img/Rectangle78.png)" }}>
      <Container sx={{ color: "white" }} maxWidth="lg">
        This is Sell Page
        <Location />
      </Container>
    </Box>
  );
}

export default Sell;
