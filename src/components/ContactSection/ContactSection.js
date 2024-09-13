import { Box, Container, Grid } from "@mui/material";
import Rectangle from "../../img/Rectangle108.png";
import Map from "../Map/Map";
import SendMessage from "../SendMessage/SendMessage";

function ContactSection() {
  return (
    <Box sx={{
      py: "50px",
      background: `url(${Rectangle})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: 'cover'
    }}>
      <Container sx={{ color: "white" }} maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Map />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <SendMessage title={'Contact'} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection