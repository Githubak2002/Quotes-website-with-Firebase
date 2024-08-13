import React, { useEffect } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes,Route,} from "react-router-dom";

import Login from "./components/Login";
import Profile from "./components/Profile";

import { useState } from "react";
import { auth } from "./components/firebase";
import Quote from "./Pages/Quote";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/Signup";
import PageNotFound from "./components/PageNotFoud";


function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <section className="max-w-[1400px] mx-auto">

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quote />} />
        {/* <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
      
    <Toaster />

    </section>
  );
}

export default App;
