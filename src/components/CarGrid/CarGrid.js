import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./css/carGrid.css";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedInUserFavorites } from "../../redux/authSlice";
import "./css/carGrid.css";
import PaginationControl from "../Pagination/Pagination";

const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authSlice.loggedInUser);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchFilteredCars(cars);
    } else {
      const newItems = cars.filter((car) =>
        `${car.make} ${car.model}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchFilteredCars(newItems);
    }
  }, [searchTerm, cars]);

  const handleAddToFavorites = async (carId) => {
    console.log(carId, loggedInUser.uid);
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
        {searchFilteredCars.map((car) => (
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
      <PaginationControl />
    </div>
  );
};

export default CarGrid;
