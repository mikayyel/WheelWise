import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import CarGrid from "../CarGrid/CarGrid";
import { selectLoggedInUser } from "../../redux/authSlice";
import { Typography } from "@mui/material";
import { db } from "../../firebase/firebase";

const UserFavorites = () => {
  const user = useSelector(selectLoggedInUser);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(favorites, user);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: "10" }}>
        Your Favorites Cars
      </Typography>
      {loading ? (
        <p>Loading favorites...</p>
      ) : (
        <CarGrid cars={favorites} searchTerm={""} />
      )}
    </div>
  );
};

export default UserFavorites;
