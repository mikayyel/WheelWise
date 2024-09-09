import { Box, Container, Grid } from "@mui/material";
import Map from "../components/Map/Map";
import Address from "../components/Address/Address";
import SendMessage from "../components/SendMessage/SendMessage";
import Rectangle from "../img/Rectangle108.png";

function Contact() {
  return (
    <Box sx={{ py: 15 }}>
      <Box
        sx={{
          py: "50px",
          background: `url(${Rectangle})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        }}
      >
        <Container sx={{ color: "white" }} maxWidth="lg">
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <SendMessage title={'Get In Touch'} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Address />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Map marginTop={10} />
    </Box>
  );
}

export default Contact;
