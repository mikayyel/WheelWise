import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { db } from '../../firebase/firebase';
import { inputStyle } from "../SignIn/constants/constants";

export default function SendMessage({ title }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "messages"), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        createdAt: new Date(),
      });
      setSnackbarMessage("Message sent successfully!");
      setOpenSnackbar(true);

      reset();
    } catch (error) {
      console.error("Error sending message: ", error.message);
      setSnackbarMessage(`Failed to send message: ${error.message}`);
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "40px", color: "#FFFFFF" }}
        >
          {title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Full name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name can only contain letters and spaces",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                {...field}
                label="Full Name"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                autoComplete="given-name"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                {...field}
                label="Email Address"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
                margin="normal"
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                {...field}
                label="Phone"
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone?.message}
                autoComplete="phone"
                margin="normal"
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{ required: "Message is required" }}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                {...field}
                label="Message"
                fullWidth
                required
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
                margin="normal"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
