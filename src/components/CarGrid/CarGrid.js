import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { React, useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { db } from "../../firebase/firebase";
import {
  deleteFromLoggedInUserFavorites,
  updateLoggedInUserFavorites,
} from "../../redux/authSlice";
import { setCurrentCar } from "../../redux/carSlice";
import PaginationControl from "../Pagination/Pagination";
import "./css/carGrid.css";

const CarGrid = ({ cars, searchTerm }) => {
  console.log("carGrid");
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.loggedInUser);
  const currentCar = useSelector((state) => state.currentCar.currentCar);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setSearchFilteredCars(cars);
    } else {
      const newItems = cars.filter((car) =>
        `${car.make} ${car.model}`
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setSearchFilteredCars(newItems);
    }
  }, [debouncedSearchTerm, cars]);

  const handleAddToFavorites = useCallback(
    async (car) => {
      if (!user) return;
      console.log(car.id);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const carDocRef = doc(db, "cars", car.id);

        await updateDoc(userDocRef, {
          favorites: arrayUnion(carDocRef),
        });
        console.log("updateLoggedInUserFavorites");
        dispatch(updateLoggedInUserFavorites(carDocRef));

        console.log("Car added to favorites successfully!");
      } catch (error) {
        console.error("Error adding car to favorites: ", error.message);
      }
    },
    [user, dispatch]
  );

  const handleDeleteFromFavorites = useCallback(
    async (car) => {
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const carDocRef = doc(db, "cars", car.id);

        await updateDoc(userDocRef, {
          favorites: arrayRemove(carDocRef),
        });
        console.log("deleteFromLoggedInUserFavorites");
        dispatch(deleteFromLoggedInUserFavorites(carDocRef));

        console.log("Car removed from favorites successfully!");
      } catch (error) {
        console.error("Error removing car from favorites: ", error.message);
      }
    },
    [user, dispatch]
  );
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, async (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoriteCarsRefs = userData.favorites || [];
        const favoriteCars = [];

        for (const carRef of favoriteCarsRefs) {
          const carDoc = await getDoc(carRef);
          if (carDoc.exists()) {
            favoriteCars.push({ id: carDoc.id, ...carDoc.data() });
          }
        }

        setFavorites(favoriteCars);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="car-list">
      <div className="car-grid">
        {searchFilteredCars.length > 0 ? (
          searchFilteredCars.map((car) => (
            <div
              key={car.id}
              className="car-card"
              onClick={() => {
                dispatch(setCurrentCar(car));
                console.log(currentCar);
                navigate(`/currentCar/${currentCar.id}`);
              }}
            >
              <img src={car.image[2]} alt="" />
              <h2>
                {car.make} {car.model}
                <p style={{ float: "right" }}>
                  {user && favorites.some((favCar) => favCar.id === car.id) ? (
                    <FavoriteIcon
                      onClick={() => handleDeleteFromFavorites(car)}
                      sx={{ color: "#ff0000", cursor: "pointer" }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() => handleAddToFavorites(car)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </p>
              </h2>
              <p>${car.price}</p>
              <div className="cars-info">
                <div>
                  <CalendarMonthIcon />
                </div>
                <p>{car.year}</p>
                <div>
                  <LocalGasStationIcon />
                </div>
                <p>{car.fuelType}</p>
                <div>
                  <TimeToLeaveIcon />
                </div>
                <p>{car.transmission}</p>
                <div>
                  <PeopleAltIcon />
                </div>
                <p>{car.owners}</p>
              </div>
            </div>
          ))
        ) : (
          <Typography className="no-results">
            No information matching your request was found.
          </Typography>
        )}
      </div>
      <PaginationControl />
    </div>
  );
};

export default CarGrid;
