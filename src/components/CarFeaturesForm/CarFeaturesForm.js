import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, TextField, Typography, Grid, Divider } from "@mui/material";
import { allFeatures } from "./helpers/helpers";
import { inputStyle } from "../SignIn/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeFeatures } from "../../redux/sellingCar";

const CarFeaturesForm = () => {
  const dispatch = useDispatch();
  const { features } = useSelector((state) => state.sellingCarSlice);
  const [customFeature, setCustomFeature] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFeatureToggle = (feature) => {
    console.log(features);

    if (features.includes(feature)) {
      dispatch(handleChangeFeatures(features.filter((f) => f !== feature)));
    } else {
      dispatch(handleChangeFeatures([...features, feature]));
    }
  };

  const handleAddFeature = (e, customFeature) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (customFeature.trim()) {
        let i = allFeatures.length - 1
        allFeatures.splice(i, 0, customFeature)

        const updatedFeatures = [...features.filter((f) => f !== "Other"), customFeature]
        console.log(updatedFeatures);

        dispatch(handleChangeFeatures(updatedFeatures));
      }
      setCustomFeature("")
    }
  }

  // Handle custom feature input change
  const handleCustomFeatureChange = (e) => {
    setCustomFeature(e.target.value);
  };

  // Filter features based on search term
  const filteredFeatures = allFeatures.filter((feature) =>
    feature.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, backgroundColor: "#071620", borderRadius: "8px", color: "#fff", mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, display: "inline-block" }}>
        Features
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>
      <TextField
        placeholder="Search here"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ ...inputStyle, bgcolor: "#152836", mb: 2 }}
      />

      <Grid container>
        {filteredFeatures.map(feature => (
          <Grid item xs={6} sm={4} md={3} key={feature}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  sx={{ color: "#fff" }}
                />
              }
              label={feature}
              sx={{ color: "#fff", fontSize: { xs: "14px" } }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Show custom feature input if "Other" is selected */}
      {features.includes("Other") && (
        <TextField
          label="Write another feature here"
          variant="outlined"
          fullWidth
          value={customFeature}
          onChange={handleCustomFeatureChange}
          onKeyDown={e => handleAddFeature(e, customFeature)}
          sx={{ ...inputStyle, bgcolor: "#152836", mt: 3 }}
        />
      )}
    </Box>
  );
};

export default CarFeaturesForm;
