import React from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import CarGrid from "../CarGrid/CarGrid";

const UserFavorites = () => {
  const user = useSelector((state) => state.authSlice.loggedInUser);
  // const favorites = useSelector(selectLoggedInUserFavorites);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

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
      } catch (error) {
        console.error("Error fetching favorites: ", error.message);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div>
      <CarGrid cars={favorites} searchTerm={""} />
    </div>
  );
};

export default UserFavorites;
