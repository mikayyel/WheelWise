import { Box, Container, Grid, Typography } from "@mui/material"
import SellIcon from '@mui/icons-material/Sell';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

function OurService() {
  return (
    <Box mt={10} pb={10}>
      <Container sx={{ color: 'white' }} maxWidth='lg' >
        <Typography variant="h4" mb={5}>
          Our Service
        </Typography>
        <Grid container sx={{ textAlign: 'center' }} spacing={10}>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '2px solid #007CC7', padding: '32px 95px' }}>
              <TimeToLeaveIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Buy a new car</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '2px solid #007CC7', padding: '32px 95px' }}>
              <TimeToLeaveIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Buy an used car</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '2px solid #007CC7', padding: '32px 95px' }}>
              <SellIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Sell my car</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default OurService