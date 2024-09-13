import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./css/carGrid.css";
import { useDebounce } from "use-debounce";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromLoggedInUserFavorites,
  updateLoggedInUserFavorites,
} from "../../redux/authSlice";
import "./css/carGrid.css";
import PaginationControl from "../Pagination/Pagination";
import "./css/carGrid.css";

const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.loggedInUser);

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

  const handleAddToFavorites = async (car) => {
    console.log(car.id);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const carDocRef = doc(db, "cars", car.id);
      console.log("carDocRef", carDocRef);

      await updateDoc(userDocRef, {
        favorites: arrayUnion(carDocRef),
      });
      dispatch(updateLoggedInUserFavorites(carDocRef));

      console.log("Car added to favorites successfully!");
    } catch (error) {
      console.error("Error adding car to favorites: ", error.message);
    }
  };

  const handleDeleteFromFavorites = async (car) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const carDocRef = doc(db, "cars", car.id);
      console.log("carDocRef", carDocRef);

      await updateDoc(userDocRef, {
        favorites: arrayRemove(carDocRef),
      });
      dispatch(deleteFromLoggedInUserFavorites(carDocRef));

      console.log("Car added to favorites successfully!");
    } catch (error) {
      console.error("Error adding car to favorites: ", error.message);
    }
  };

  return (
    <div className="car-list">
      <div className="car-grid">
        {searchFilteredCars.length > 0 ? (
          searchFilteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image[2]} alt="" />
              <h2>
                {car.make} {car.model}
                <p style={{ float: "right" }}>
                  {user &&
                  user.favorites.some((favCar) => favCar.id === car.id) ? (
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
