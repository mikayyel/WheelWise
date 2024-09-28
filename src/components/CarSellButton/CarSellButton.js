import { Alert, Backdrop, Box, Button, CircularProgress, Snackbar } from "@mui/material"
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { handleReset, handleUserIdChange } from "../../redux/sellingCar";
import { addUserAnnouncement, selectLoggedInUser } from "../../redux/authSlice";

export const CarSellButton = () => {
  const dispatch = useDispatch()
  const { userId, id, make, model, year, color, description, condition, fuelType, mileage, transmission, engine, horsepower, price, location, features, image } = useSelector(state => state.sellingCarSlice)
  const user = useSelector(selectLoggedInUser)
  const [loading, setLoading] = useState(false); // Loader state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(handleUserIdChange(user.uid))
  }, [user, dispatch])

  const handleSellCar = async () => {
    setLoading(true);
    try {
      const imgURL = await uploadImagesToStorage();

      await setDoc(doc(db, 'cars', id), {
        userId,
        id,
        make,
        model,
        year,
        color,
        description,
        condition,
        fuelType,
        mileage,
        transmission,
        engine,
        horsepower,
        price,
        location,
        features,
        image: imgURL
      });

      updateAnnouncement(id, userId)
      dispatch(handleReset());
      setSnackbarMessage('Car announcement add successfully!');
    } catch (error) {
      setSnackbarMessage("Error selling car: ", error);
      setSnackbarSeverity("error");

    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };


  const uploadImagesToStorage = async () => {
    if (!image.length) return [];

    const uploadPromises = image.map((img) => {
      const storageRef = ref(storage, `car_images/${id}/${img.storageObj.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img.storageObj);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: Track progress if needed
          },
          (error) => {
            console.error("Error uploading file: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    const imgURLs = await Promise.all(uploadPromises);
    return imgURLs;
  };

  const updateAnnouncement = async (carId, userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const carDocRef = doc(db, "cars", carId);

      await updateDoc(userDocRef, {
        announcements: arrayUnion(carDocRef),
      });

      dispatch(addUserAnnouncement(carDocRef))
    } catch (error) {
      console.error("Error adding car to announcements: ", error.message);
    }
  }

  return (
    <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        onClick={handleSellCar}
        sx={{
          width: { xs: '100%', md: '60%' },
          color: '#fff',
          borderRadius: '5px',
          p: 2,
          fontWeight: '500',
          textTransform: 'unset'
        }}
        disabled={loading}
      >
        Sell My Car
      </Button>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}