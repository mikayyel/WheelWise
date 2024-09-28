import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from '@mui/icons-material/Email';
import { Box, Divider, Typography } from "@mui/material";

function Address() {
  return (
    <Box p={2} mx={4}
      sx={{
        backgroundColor: "#0D3547",
        padding: "30px",
        borderRadius: "8px",
        color: "white",
        maxWidth: "500px",
        textAlign: 'center',
        mt: {
          xs: 0,
          md: '78px'
        }
      }}
    >
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
        <LocalPhoneIcon fontSize="md" sx={{ marginRight: "10px" }} />
        Phone
      </Typography>
      <Typography variant="body1" sx={{ color: '#4DA8DA' }}>
        240-865-3730
      </Typography>

      <Divider sx={{ bgcolor: 'white', my: 5 }} />

      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <EmailIcon fontSize="md" sx={{ marginRight: "10px" }} />
        Email
      </Typography>
      <Typography variant="body1" sx={{ color: '#4DA8DA' }}>
        info@wheelwise.com
      </Typography>

      <Divider sx={{ bgcolor: 'white', my: 5 }} />

      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <FmdGoodIcon sx={{ marginRight: "10px" }} />
        Address
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: '#4DA8DA' }}>
        3 Hakob Hakobyan Street, Yerevan, Armenia
      </Typography>
    </Box>
  );
}
export default Address;