import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeLocation } from "../../redux/sellingCar";
import { customInputStyle } from "../CarDetailsForm/helpers/helpers";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
};

function Location() {
  const dispatch = useDispatch()
  const { location } = useSelector(state => state.sellingCarSlice)
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      const data = await response.json();
      console.log(data);

      if (data.length === 0) {
        setError("Address not found. Please enter a valid address.");
        return;
      }

      const { lat, lon } = data[0];
      dispatch(handleChangeLocation([parseFloat(lat), parseFloat(lon)]));
      setError(null);
    } catch (error) {
      console.error("Error fetching location:", error);
      setError(
        "Error fetching location. Please try again and enter valid address."
      );
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#071620', borderRadius: '8px', color: '#fff', mb: 5 }}>

      <Typography variant="h5" sx={{ mb: 3, display: 'inline-block' }} gutterBottom>
        Location
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>
      <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Address</Typography>
      <TextField
        sx={{ ...customInputStyle, mt: 0, mb: 2, bgcolor: '#152836', borderRadius: '4px' }}
        placeholder="Enter your address"
        value={address}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.target.value);
            setAddress("");
          }
        }}
        fullWidth
        margin="normal"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} />
        <RecenterMap location={location} />
      </MapContainer>
    </Box>
  );
}

export default Location;
