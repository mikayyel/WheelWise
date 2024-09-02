import React, { useEffect } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setLoggedInUser } from "../../redux/authSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import JustPage from "../JustPage";

const Main = () => {
  const loggedInUser = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch(setLoggedInUser(user));
    });
  }, []);

  return (
    <>
      <Routes>
        {loggedInUser ? (
          <>
            <Route path="/" element={<JustPage />}></Route>
            <Route
              path="/signin"
              element={<Navigate to="/" replace={true} />}
            ></Route>
            <Route
              path="/signup"
              element={<Navigate to="/" replace={true} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="*"
              element={<Navigate to="/signin" replace={true} />}
            ></Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default Main;

