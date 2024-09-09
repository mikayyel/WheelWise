import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./css/carGrid.css";
import { useDebounce } from "use-debounce";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedInUserFavorites } from "../../redux/authSlice";
import "./css/carGrid.css";
import PaginationControl from "../Pagination/Pagination";

const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authSlice.loggedInUser);

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

  const handleAddToFavorites = async (carId) => {
    if (!loggedInUser) return;

    const userDocRef = doc(db, "users", loggedInUser.uid);
    const carDocRef = doc(db, "cars", carId);

    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(carDocRef),
      });

      dispatch(updateLoggedInUserFavorites(carDocRef));
      console.log("Updated favorites in Redux:", loggedInUser.favorites);
    } catch (error) {
      console.error("Error updating favorites: ", error.message);
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
                  <FavoriteBorderIcon
                    onClick={() => handleAddToFavorites(car.id)}
                  />
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
