// import { Typography } from "@mui/material";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { useDispatch, useSelector } from "react-redux";
// import { db } from "../../firebase/firebase";
// import {
//   selectLoggedInUser,
//   updateLoggedInUserFavorites,
// } from "../../redux/authSlice";

// function UserFavorites(params) {
//   const dispatch = useDispatch();
//   const loggedInUser = useSelector(selectLoggedInUser);
//   const onAddToFavoriteClick = async (item) => {
//     await updateDoc(doc(db, "users", loggedInUser.uid), {
//       favorites: arrayUnion(doc(db, "cars", item.uid)),
//     });
//     dispatch(updateLoggedInUserFavorites(doc(db, "cars", item.uid)));
//   };

//   return <Typography>This is UserFavorites tab</Typography>;
// }

// export default UserFavorites;

import React from "react";
import { useSelector } from "react-redux";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { inputStyle } from "../SignIn/constants/constants";

const UserFavorites = () => {
  const loggedInUser = useSelector((state) => state.authSlice.loggedInUser);
  const [favoriteCars, setFavoriteCars] = useState([]);

  useEffect(() => {
    if (!loggedInUser) {
      console.log("User not logged in or no favorites found.");
      return;
    }

    const fetchFavoriteCars = async () => {
      if (!loggedInUser.favorites || loggedInUser.favorites.length === 0) {
        setFavoriteCars([]);
        return;
      }

      try {
        const favoriteCarsList = await Promise.all(
          loggedInUser.favorites.map(async (carRef) => {
            const carDoc = await getDoc(carRef);
            return { id: carDoc.id, ...carDoc.data() };
          })
        );
        setFavoriteCars(favoriteCarsList);
        console.log("Favorite cars fetched: ", favoriteCarsList);
      } catch (error) {
        console.error("Error fetching favorite cars:", error.message);
      }
    };

    fetchFavoriteCars();
  }, [loggedInUser]);

  return (
    <div>
      <h2>Your Favorite Cars</h2>
      <div>
        {favoriteCars.length > 0 ? (
          favoriteCars.map((car) => (
            <div style={{ backgroundColor: "red" }} key={car.id}>
              <h3 style={{ textColor: "white" }}>
                Barev
                {car.make} {car.model}
              </h3>
              <p>Price: ${car.price}</p>
              {car.image && car.image.length > 0 ? (
                <img
                  src={car.image[0]}
                  alt={`${car.make} ${car.model}`}
                  style={{ width: "200px", height: "auto" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))
        ) : (
          <p>No favorite cars found.</p>
        )}
      </div>
    </div>
  );
};

export default UserFavorites;
