import { Box, Container, Divider, Typography } from "@mui/material"
import logo from '../../img/logo.png'
import '../Header/css/header.css'
import { useNavigate } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <Box bgcolor='#12232E' py={1} color='white' sx={{ textAlign: 'center' }} >
      <Container maxWidth='lg' >
        <img onClick={handleLogoClick} className='logo' src={logo} alt='...' />
        <Typography variant="h6" sx={{ fontWeight: 400, fontStyle: 'italic', pt: 1, pb: 2 }}>
          Drive Smart, Trade Wise – With WheelWise.
        </Typography>
        <Divider
          sx={{
            height: '2px',
            background: 'linear-gradient(to right, transparent, #fff 50%, transparent)',
            borderRadius: '2px',
            mb: 2
          }} />
        <Typography variant="p" sx={{ fontWeight: 400 }}>
          3 Hakob Hakobyan Street, Yerevan, Armenia
        </Typography>
        <p style={{ marginTop: '16px', marginBottom: '24px' }} >
          240-865-3730 | info@wheelwise.com
        </p>
        <FacebookIcon sx={{ cursor: 'pointer' }} />
        <InstagramIcon sx={{ mx: 5, cursor: 'pointer' }} />
        <YouTubeIcon sx={{ cursor: 'pointer' }} />
        <Divider
          sx={{
            height: '2px',
            background: 'linear-gradient(to right, transparent, #fff 50%, transparent)',
            my: 1
          }} />
        <p style={{ fontSize: '14px' }}>2024 WheelWise. All Rights reserved</p>
      </Container>
    </Box>
  )
}

export default Footer