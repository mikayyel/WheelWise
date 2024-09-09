import { Box, Container } from "@mui/material";
import Location from "../components/Location/Location";

function Sell() {
  return (
    <Box sx={{ pt: 20 }}>
      <Container sx={{ color: "white" }} maxWidth="lg">
        This is Sell Page
        <Location />
      </Container>
    </Box>
  );
}

export default Sell;
