import Header from "./components/Header/Header";
import { BrowserRouter, Outlet } from "react-router-dom";
import FilterCars from "./components/FilterCars/FilterCars";
import SearchCars from "./components/SearchCars/SearchCars";
import CarGrid from "./components/CarGrid/CarGrid";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setLoggedInUser } from "./redux/authSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import NewCars from "./pages/NewCars";
import UsedCars from "./pages/UsedCars";
import AboutUs from "./pages/AboutUs";
import Sell from "./pages/Sell";
import Contact from "./pages/Contact";

function App() {
  const loggedInUser = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch(setLoggedInUser(user));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Layout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
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
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
