import { Box, Container, Grid, Typography } from "@mui/material";
import Map from "../components/Map/Map";
import Address from "../components/Address/Address";
import SendMessage from "../components/SendMessage/SendMessage";
import Rectangle from '../img/Rectangle108.png'

function Contact() {
  return (
    <Box sx={{ py: "50px" }}>
      <Box
        sx={{
          py: "50px",
          background: `url(${Rectangle})`,
          backgroundRepeat: 'no-repeat'
        }}>
        <Container sx={{ color: 'white' }} maxWidth='lg' >
          <Typography variant="h4" sx={{ marginBottom: "40px", color: '#FFFFFF', textAlign: 'center' }}>
            Get In Touch
          </Typography>
          <Grid container spacing={10} >
            <Grid item xs={12} md={6}>
              <SendMessage />
            </Grid>
            <Grid item xs={12} md={6}>
              <Address />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Map />
    </Box>

  )
}

export default Contact


