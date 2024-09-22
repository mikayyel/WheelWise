import { Box, Container } from "@mui/material";
import Location from "../components/Location/Location";

function Sell() {
  return (
    <Box sx={{ pt: 20 }}>
      <Container sx={{ color: "white" }} maxWidth="lg">
        <Location />
      </Container>
    </Box>
  );
}

export default Sell;
