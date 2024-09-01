import { Box, Container } from "@mui/material";

function Home() {
  return (
    <Box sx={{ backgroundImage: 'url(../img/Rectangle78.png)' }}>
      <Container sx={{ color: 'white' }} maxWidth='lg' >
        This is Home
      </Container>
    </Box>)
}

export default Home