import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTopButton from "./components/CustomComponents/ScrollToTopButton";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import SinglePage from './components/SinglePage/SinglePage';
import UserProfile from "./components/UserProfile/UserProfile";
import { auth, db } from "./firebase/firebase";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewCars from "./pages/NewCars";
import Sell from "./pages/Sell";
import UsedCars from "./pages/UsedCars";
import { selectLoggedInUser, setLoggedInUser } from "./redux/authSlice";

function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log(user.uid);
          const additionalData = await getDoc(doc(db, "users", user.uid));

          console.log(user);
          dispatch(
            setLoggedInUser({
              ...additionalData.data(),
              ...user,
              photoURL: additionalData.data().photoURL,
            })
          );
        } catch (e) {
          console.log(e.message);
        }
      } else {
        dispatch(setLoggedInUser(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Layout = () => (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
      <ScrollToTopButton />
    </Box>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {loggedInUser ? (
            <>
              <Route index element={<Home />}></Route>
              <Route
                path="/signin"
                element={<Navigate to="/" replace={true} />}
              ></Route>
              <Route
                path="/signup"
                element={<Navigate to="/" replace={true} />}
              ></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/newcars" element={<NewCars />}></Route>
              <Route path="/usedcars" element={<UsedCars />}></Route>
              <Route path="/sell" element={<Sell />}></Route>
              <Route path="/aboutus" element={<AboutUs />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/profile" element={<UserProfile />}>
                <Route path="information"></Route>
                <Route path="favorites"></Route>
                <Route path="announcements"></Route>
              </Route>
            </>
          ) : (
            <>
              <Route index element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/newcars" element={<NewCars />}></Route>
              <Route path="/usedcars" element={<UsedCars />}></Route>
              <Route path="/sell" element={<Sell />}></Route>
              <Route path="/aboutus" element={<AboutUs />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path='/singlePage' element={<SinglePage />}></Route>
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
