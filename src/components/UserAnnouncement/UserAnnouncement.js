import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import CarGrid from "../CarGrid/CarGrid";

function UserAnnouncement(params) {
  const user = useSelector(selectLoggedInUser);

  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, async (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();

        const announcementsRefs = userData.announcements || [];
        const announcements = [];
        console.log(announcementsRefs);

        for (const carRef of announcementsRefs) {
          const carDoc = await getDoc(carRef);

          if (carDoc.exists()) {
            announcements.push({ id: carDoc.id, ...carDoc.data() });
          }
        }

        setAnnouncement(announcements);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);
  console.log(announcement);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: "10" }}>
        Your Announcements
      </Typography>
      {loading ? (
        <p>Loading your announcements...</p>
      ) : (
        <CarGrid cars={announcement} searchTerm={""} />
      )}
    </div>
  );
}

export default UserAnnouncement