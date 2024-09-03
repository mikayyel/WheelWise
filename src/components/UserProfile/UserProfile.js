import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps, CustomTabPanel } from './helpers/helpers';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import UserFavorites from '../UserFavorites/UserFavorites';
import UserAnnouncement from '../UserAnnouncement/UserAnnouncement';
import UserInformation from '../UserInformation/UserInformation';

function UserProfile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', pt: 5, color: 'white' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ px: '10%' }} aria-label="person" icon={<PersonPinIcon sx={{ color: 'white' }} />}  {...a11yProps(2)} />
          <Tab sx={{ px: '10%' }} aria-label="favorite" icon={<FavoriteIcon sx={{ color: 'white' }} />} {...a11yProps(1)} />
          <Tab sx={{ px: '10%' }} aria-label="phone" icon={<SellIcon sx={{ color: 'white' }} />} {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserInformation />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserFavorites />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserAnnouncement />
      </CustomTabPanel>
    </Box>
  );
}

export default UserProfile