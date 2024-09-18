import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import imageSrc from "../../img/bgsignin.png";
import { inputStyle } from "../SignIn/constants/constants";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSignUp = async (data) => {
    const { firstName, lastName, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        email,
        lastName,
        favorites: [],
        notes: [],
        photoURL: "",
      });

      setErrorMessage("");
    } catch (error) {
      console.error(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "This email address is already registered. Please use another email."
        );
      } else {
        setErrorMessage("An error occurred during sign-up. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        background: `url(${imageSrc}) 0 50% / cover no-repeat`,
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ color: "white" }} component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSignUp)}
            sx={{ mt: 3 }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message:
                        "First name must be at least 2 characters and only letters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "First name can only contain letters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={inputStyle}
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      autoComplete="given-name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Last name can only contain letters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={inputStyle}
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      autoComplete="family-name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
                      variant="outlined"
                      fullWidth
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={inputStyle}
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  <NavLink style={{ color: "white" }} to="/signin">
                    Already have an account? Sign in
                  </NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
