import { Button } from "@mui/material";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

import SendMessage from "./SendMessage/SendMessage";

const JustPage = () => {
  const user = useSelector((state) => state.authSlice.loggedInUser);
  // const dispatch = useDispatch();
  // const firstName = useSelector(setFirstName);
  // const lastName = useSelector(setLastName);

  return (
    <div>
      <div>
        this is JustPage component
        <div>
          {user ? (
            <div>
              <h1>
                Welcome, {user.firstName} {user.lastName}!
              </h1>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <h1>Please sign up or log in.</h1>
          )}
        </div>
        <Button
          onClick={() => {
            signOut(getAuth());
          }}
        >
          sign out
        </Button>
        <SendMessage />
      </div>
    </div>
  );
};

export default JustPage;
