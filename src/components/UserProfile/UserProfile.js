import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { a11yProps, CustomTabPanel } from "./helpers/helpers";
import SellIcon from "@mui/icons-material/Sell";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import UserFavorites from "../UserFavorites/UserFavorites";
import UserAnnouncement from "../UserAnnouncement/UserAnnouncement";
import UserInformation from "../UserInformation/UserInformation";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

function UserProfile() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    switch (location.pathname) {
      case "/profile/information":
        setValue(0);
        break;
      case "/profile/favorites":
        setValue(1);
        break;
      case "/profile/announcements":
        setValue(2);
        break;
      default:
        setValue(0);
    }
    if (location.pathname === "/profile/information") {
      setValue(0);
    } else if (location.pathname === "/profile/favorites") {
      setValue(1);
    } else if (location.pathname === "/profile/announcements") {
      setValue(2);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("information");
        break;
      case 1:
        navigate("favorites");
        break;
      case 2:
        navigate("announcements");
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%", pt: 10, color: "white" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", textAlign: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user profile tabs"
          variant={matches ? "fullWidth" : "standard"}
        >
          <Tab
            sx={{
              px: "10%",
              minWidth: { xs: 0, md: 'auto' },
              color: "white",
            }}
            aria-label="person"
            label={matches ? '' : "Person"}
            icon={<PersonPinIcon sx={{ color: "white" }} />}
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              px: "10%",
              minWidth: { xs: 0, md: 'auto' },
              color: "white",
            }}
            aria-label="favorite"
            label={matches ? '' : "Favorites"}
            icon={<FavoriteIcon sx={{ color: "white" }} />}
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              px: "10%",
              minWidth: { xs: 0, md: 'auto' },
              color: "white",
            }}
            aria-label="sell"
            label={matches ? '' : "Announcements"}
            icon={<SellIcon sx={{ color: "white" }} />}
            {...a11yProps(0)}
          />
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

export default UserProfile;
