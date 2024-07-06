import React, { useEffect } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes,Route,} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import { useState } from "react";
import { auth } from "./components/firebase";
import Quote from "./Pages/Quote";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";


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
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
      
    <Toaster />

    </section>
  );
}

export default App;
