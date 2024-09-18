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

function UserProfile() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   switch (newValue) {
  //     case 0:
  //       navigate('information');
  //       break;
  //     case 1:
  //       navigate('favorites');
  //       break;
  //     case 2:
  //       navigate('announcements');
  //       break;
  //     default:
  //       break;
  //   }
  // };
  return (
    <Box sx={{ width: "100%", pt: 10, color: "white" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", textAlign: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ px: "10%" }}
            aria-label="person"
            icon={<PersonPinIcon sx={{ color: "white" }} />}
            {...a11yProps(2)}
          />
          <Tab
            sx={{ px: "10%" }}
            aria-label="favorite"
            icon={<FavoriteIcon sx={{ color: "white" }} />}
            {...a11yProps(1)}
          />
          <Tab
            sx={{ px: "10%" }}
            aria-label="sell"
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
