import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Divider, TextField, Typography } from "@mui/material";
import { inputStyle } from "../SignIn/constants/constants";
import { Alert } from "@mui/material";
// npm install leaflet react-leaflet

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
};

function Location() {
  const [location, setLocation] = useState([40.1872, 44.5152]);
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
      setLocation([parseFloat(lat), parseFloat(lon)]);
      setError(null);
    } catch (error) {
      console.error("Error fetching location:", error);
      setError(
        "Error fetching location. Please try again and enter valid address."
      );
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ color: "white" }} gutterBottom>
        Location
      </Typography>
      <Divider
        sx={{
          bgcolor: "white",
          width: "20%",
          mr: "20",
          borderBottomWidth: "2px",
        }}
      />
      <Typography
        sx={{ color: "white", fontSize: "14px", mt: "12px" }}
        gutterBottom
      >
        Address
      </Typography>
      <TextField
        sx={inputStyle}
        // label="Add a note..."
        placeholder="enter your location"
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
    </div>
  );
}

export default Location;
