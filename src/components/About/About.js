import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import imageSrc from '../../img/Rectangle110.png'

function About() {
  return (
    <Box mt={10} bgcolor='#12232E' pb={10}>
      <Container sx={{ color: 'white' }} maxWidth='lg' >
        <Grid container spacing={10}>
          <Grid item xs={12} md={5}>
            <Typography variant="h3" mb={5}>
              About Us
            </Typography>
            <Typography sx={{ textAlign: 'justify' }} mb={5} >
              WireWise is a cutting-edge platform for buying and selling cars, designed to simplify the entire process. Whether you're looking to purchase your dream car or sell your current one, WireWise offers a user-friendly experience with advanced search filters, detailed car listings, and secure transactions. The site connects buyers and sellers seamlessly, ensuring transparency and trust. With a sleek design and easy navigation, WireWise makes car trading convenient and efficient for everyone.
            </Typography>
            <Grid container sx={{ textAlign: 'center' }} spacing={1} >
              <Grid item xs={6} mb={2}>
                <div>
                  <Typography variant='h2'>30</Typography>
                  <Divider sx={{ bgcolor: 'white', my: 1, mx: 5 }} />
                  <Typography variant='p'>Vehicle In Stock</Typography>
                </div>
              </Grid>
              <Grid item xs={6} mb={2}>
                <div>
                  <Typography variant='h2'>12</Typography>
                  <Divider sx={{ bgcolor: 'white', my: 1, mx: 5 }} />
                  <Typography variant='p'>Sold Car</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography variant='h2'>10</Typography>
                  <Divider sx={{ bgcolor: 'white', my: 1, mx: 5 }} />
                  <Typography variant='p'>Happy Customer</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography variant='h2'>5</Typography>
                  <Divider sx={{ bgcolor: 'white', my: 1, mx: 5 }} />
                  <Typography variant='p'>Awards</Typography>
                </div>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} md={7}>
            <img style={{ maxWidth: '100%' }} src={imageSrc} alt='...' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About