import { Box, Container } from "@mui/material";
import Header from "../components/Header/Header";

function Home() {
  return (
    <Box sx={{ backgroundImage: 'url(../img/Rectangle78.png)' }}>
      <Container maxWidth='lg' >
        <Header />
      </Container>
    </Box>)
}

export default Home