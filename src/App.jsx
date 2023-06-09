import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import NavbarHidden from "./Components/NavbarHidden";
import SubNavMobile from "./Components/SubNavMobile";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import Showcase from "./Components/Showcase";
import User from "./Components/User";
import Wishlist from "./Components/Wishlist";
import ProductState from "./Context/Product/ProductState";
import MainState from "./Context/Main/MainState";

const App = () => {
  const [LoginFlag, setLoginFlag] = useState(false);

  const updateLoginFlag = (flag) => {
    setLoginFlag(flag);
  };

  return (
    <>
      <React.StrictMode>
        <ProductState>
          <MainState>
            <BrowserRouter>
              {!LoginFlag && <Navbar />}
              {!LoginFlag && <NavbarHidden />}
              <SubNavMobile />

              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route
                  exact
                  path="/login"
                  element={<Login updateLoginFlag={updateLoginFlag} />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<Signup updateLoginFlag={updateLoginFlag} />}
                />
                <Route exact path="/showcase" element={<Showcase />} />
                <Route exact path="/user" element={<User />} />
                <Route exact path="/wishlist" element={<Wishlist />} />
              </Routes>

              {!LoginFlag && <Footer />}
            </BrowserRouter>
          </MainState>
        </ProductState>
      </React.StrictMode>
    </>
  );
};

export default App;
