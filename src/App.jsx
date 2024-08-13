import React, { useEffect } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import { useState } from "react";
import { auth } from "./services/firebase";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Quote from "./Pages/Quote";
import SignUp from "./Pages/Signup";
import PageNotFound from "./components/PageNotFoud";
import ForgetPass from "./Pages/ForgetPass";

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
          <Route path="/reset-password" element={<ForgetPass />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Toaster />
    </section>
  );
}

export default App;
