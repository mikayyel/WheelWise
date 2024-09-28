import { useEffect, useState, useCallback } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { db } from "../../firebase/firebase";
import {
  deleteFromLoggedInUserFavorites,
  updateLoggedInUserFavorites,
} from "../../redux/authSlice";
import "./css/carGrid.css";
import SignInModal from "../SignInModal/SignInModal";

const CarGrid = ({ cars, searchTerm }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.loggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchCars = async () => {
      const carsRef = collection(db, "cars");
      const matches = location.pathname === "/newcars" ? "==" : ">";

      const capitalizedSearchTerm = capitalizeFirstLetter(debouncedSearchTerm);
      const carQuery = query(
        carsRef,
        where("make", ">=", capitalizedSearchTerm),
        where("make", "<=", capitalizedSearchTerm + "\uf8ff"),
        where("owners", matches, 1)
      );

      const unsubscribe = onSnapshot(carQuery, (querySnapshot) => {
        const cars = [];
        querySnapshot.forEach((doc) => {
          cars.push({ id: doc.id, ...doc.data() });
        });
        setSearchFilteredCars(cars);
      });

      return () => unsubscribe();
    };

    if (debouncedSearchTerm) {
      fetchCars();
    } else {
      setSearchFilteredCars(cars);
    }
  }, [debouncedSearchTerm, location.pathname, cars]);

  const handleAddToFavorites = useCallback(
    async (car) => {
      if (!user) {
        setOpenModal(true);
        console.log("modal");
        return;
      }
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

  const handleChooseCarClick = (carId) => {
    const basePath = location.pathname.includes("newcars")
      ? "/newcars"
      : "/usedcars";
    navigate(`${basePath}/${carId}`);
  };

  return (
    <>
      <div className="car-list">
        <div className="car-grid">
          {searchFilteredCars.length > 0 ? (
            searchFilteredCars.map((car) => (
              <div
                key={car.id}
                className="car-card"
                onClick={() => handleChooseCarClick(car.id)}
              >
                <img src={car.image[2]} alt="" />
                <h2>
                  {car.make} {car.model}
                  <p style={{ float: "right" }}>
                    {user &&
                    favorites.some((favCar) => favCar.id === car.id) ? (
                      <FavoriteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFromFavorites(car);
                        }}
                        sx={{ color: "#ff0000", cursor: "pointer" }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavorites(car);
                        }}
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
      </div>
      <SignInModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default CarGrid;
