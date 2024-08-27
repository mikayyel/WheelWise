import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const carsCol = collection(db, "cars");

  useEffect(() => {
    async function getCars() {
      try {
        const carsSnapshot = await getDocs(carsCol);
        setCars(
          carsSnapshot.docs.map((u) => ({
            id: u.id,
            ...u.data(),
          }))
        );
      } catch {}
    }
    getCars();
  }, [carsCol]);
  return (
    <>
      <div className="car-list">
        <div className="search-cars">
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <TextField fullWidth label="Search" id="fullWidth" />
          </Box>
        </div>
        <div className="car-grid">
          {cars.map((car) => (
            <div className="car-card">
              <img src={car.image[0]} alt="" />
              <h2>
                {car.make} {car.model}
              </h2>
              <p style={{ color: "rgba(0, 124, 199, 1)", fontSize: "1.5rem" }}>
                ${car.price}
              </p>

              <div className="cars-info">
                <div>
                  <CalendarMonthIcon />
                </div>
                <p style={{ color: "#fff" }}>{car.year}</p>

                <div>
                  <LocalGasStationIcon />
                </div>

                <p style={{ color: "#fff" }}>{car.fuelType}</p>
                <div>
                  <TimeToLeaveIcon />
                </div>
                <p style={{ color: "#fff" }}>{car.transmission}</p>
                <div>
                  <PeopleAltIcon />
                </div>

                <p style={{ color: "#fff" }}>{car.owners}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchCars;
