import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNoteToUser,
  deleteNoteToUser,
  updateLoggedInUser,
  updateLoggedInUserPhoto,
} from "../../redux/authSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { inputStyle } from "../SignIn/constants/constants";
import { VisuallyHiddenInput } from "./CustomComponents/VisuallyHiddenInput";

function UserInformation() {
  const user = useSelector((state) => state.authSlice.loggedInUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  const [newNote, setNewNote] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user) {
      setLocalUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user || !user.uid) {
      console.error("User or user UID is undefined");
      return;
    }
    const docRef = doc(db, "users", user.uid);
    try {
      await updateDoc(docRef, {
        firstName: localUser.firstName,
        lastName: localUser.lastName,
        email: localUser.email,
        photoURL: localUser.photoURL,
      });

      dispatch(updateLoggedInUser(localUser));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNote = async () => {
    if (user.notes && user.notes.length >= 3) {
      setSnackbarMessage(
        "You can only add 3 notes. To add a new note, delete one of the existing ones."
      );
      setSnackbarOpen(true);
      return;
    }
    if (newNote.trim()) {
      const docRef = doc(db, "users", user.uid);
      const updatedNotes = [...(user.notes || []), newNote];
      await updateDoc(docRef, {
        notes: updatedNotes,
      });

      dispatch(addNoteToUser(newNote));
      setNewNote("");
    }
  };

  const handleDeleteNote = async (index) => {
    const docRef = doc(db, "users", user.uid);
    const updatedNotes = user.notes.filter((note, i) => i !== index);
    try {
      await updateDoc(docRef, {
        notes: updatedNotes,
      });
      dispatch(deleteNoteToUser(index));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const storageRef = ref(
      storage,
      `userImages/${user.uid}/${selectedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.error("Error uploading file: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, { photoURL: downloadURL });

        dispatch(updateLoggedInUserPhoto(downloadURL));
      }
    );
  };

  useEffect(() => {
    handleUpload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "#4DA8DA" }} gutterBottom>
            User Image
          </Typography>
          <Divider
            sx={{
              bgcolor: "white",
              width: "80%",
              mr: "20",
              borderBottomWidth: "2px",
            }}
          />
          {user.photoURL ? (
            <Avatar
              src={localUser.photoURL}
              alt={localUser.firstName}
              sx={{ width: 200, height: 200, mt: 2 }}
            />
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No photo uploaded
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            tabIndex={-1}
            sx={{ mt: 4 }}
            component="label"
            role={undefined}
            startIcon={<CloudUploadIcon />}
          >
            Upload Photo
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ color: "#4DA8DA" }} gutterBottom>
            User Profile
          </Typography>
          <Divider
            sx={{
              bgcolor: "white",
              width: "80%",
              mr: "20",
              borderBottomWidth: "2px",
            }}
          />
          <Typography variant="h6" gutterBottom>
            Name:
            {isEditing ? (
              <TextField
                sx={inputStyle}
                name="firstName"
                value={localUser.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <b>&nbsp;&nbsp;{localUser.firstName}</b>
            )}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Last Name:
            {isEditing ? (
              <TextField
                sx={inputStyle}
                name="lastName"
                value={localUser.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <b>&nbsp;&nbsp;{localUser.lastName}</b>
            )}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email:
            {isEditing ? (
              <TextField
                sx={inputStyle}
                name="email"
                value={localUser.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <b>&nbsp;&nbsp;{localUser.email}</b>
            )}
          </Typography>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit your profile information
            </Button>
          )}
          <Typography
            variant="h4"
            sx={{ color: "#4DA8DA", mt: "40px" }}
            gutterBottom
          >
            You can leave your notes here
          </Typography>
          <Divider
            sx={{
              bgcolor: "white",
              width: "80%",
              mr: "20",
              borderBottomWidth: "2px",
            }}
          />
          <TextField
            sx={inputStyle}
            label="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddNote(e.target.value);
                setNewNote("");
              }
            }}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            sx={{ mt: 2 }}
          >
            Add Your Note
          </Button>
          <Box sx={{ mt: 2 }}>
            {user.notes &&
              user.notes.map((note, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">
                      <strong>Note:</strong>&nbsp;&nbsp;
                      {note}
                    </Typography>
                    <DeleteOutlineOutlinedIcon
                      sx={{ size: "small", cursor: "pointer" }}
                      onClick={() => handleDeleteNote(index)}
                    />
                  </Box>
                  <Divider sx={{ bgcolor: "white", mt: 1 }} />
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default UserInformation;