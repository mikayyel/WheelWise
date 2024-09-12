import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
>>>>>>> main
import { db } from "../../firebase/firebase";
import "./css/carGrid.css";
import { useDebounce } from "use-debounce";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedInUserFavorites } from "../../redux/authSlice";
import "./css/carGrid.css";
import PaginationControl from "../Pagination/Pagination";

<<<<<<< HEAD
const CarGrid = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const carsCol = collection(db, "cars");
  useEffect(() => {
    async function getCars() {
      try {
        const carSnapshot = await getDocs(carsCol);
        setCars(
          carSnapshot.docs.map((car) => ({
            id: car.id,
            ...car.data(),
          }))
        );
      } catch {}
    }
    getCars();
  }, []);
=======
const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.loggedInUser);
>>>>>>> main

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

  return (
    <div className="car-list">
      <div className="car-grid">
<<<<<<< HEAD
        {filteredCars.map((car) => (
          <div className="car-card">
            <img src={car.image[0]} alt="" />
            <h2>
              {car.make} {car.model}
              <p style={{ float: "right" }}>
                <FavoriteBorderIcon />
              </p>
            </h2>
            <p style={{ color: "rgba(0, 124, 199, 1)", fontSize: "1.5rem" }}>
              ${car.price}
            </p>
            <div className="cars-info">
              <div>
                <CalendarMonthIcon />
=======
        {searchFilteredCars.length > 0 ? (
          searchFilteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image[2]} alt="" />
              <h2>
                {car.make} {car.model}
                <p style={{ float: "right" }}>
                  <FavoriteBorderIcon
                    onClick={() => {
                      console.log("Car object:", car);
                      console.log("loggdeInUser:", user);
                      handleAddToFavorites(car);
                    }}
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
>>>>>>> main
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
