import { Box, Container, Grid } from "@mui/material";
import Address from "../components/Address/Address";
import Map from "../components/Map/Map";
import SendMessage from "../components/SendMessage/SendMessage";
import Rectangle from "../img/Rectangle108.png";

function Contact({ maxWidth }) {
  return (
    <Box sx={{ py: 15 }} maxWidth={maxWidth}>
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
              <Container component="main" maxWidth="md">
                <SendMessage title={'Get In Touch'} />
              </Container>
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
