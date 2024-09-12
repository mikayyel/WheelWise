import { Box, Container, Grid } from "@mui/material";
import tesla from '../../img/tesla.png'
import audi from '../../img/audi.png'
import fiat from '../../img/fiat.png'
import hyundai from '../../img/hyundai.png'
import volvo from '../../img/volvo.png'

function Partners() {
  return (
    <Box py={12}>
      <Container maxWidth="lg">
        <Grid container spacing={7}>
          <Grid item md={12 / 5} >
            <img src={tesla} alt="..." />
          </Grid>
          <Grid item md={12 / 5} >
            <img src={audi} alt="..." />
          </Grid>
          <Grid item md={12 / 5} >
            <img src={fiat} alt="..." />
          </Grid>
          <Grid item md={12 / 5} >
            <img src={hyundai} alt="..." />
          </Grid>
          <Grid item md={12 / 5} >
            <img src={volvo} alt="..." />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Partners;
