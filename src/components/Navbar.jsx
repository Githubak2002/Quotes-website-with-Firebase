import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate, NavLink } from "react-router-dom";

import toast from "react-hot-toast";

const navLinkCss = "sm:hover:scale-110 hover:transition-all hover:font-bold";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log("user is - ",user);
        setUser(user);
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/");
        toast.success("Logged out successfully!",{position: "bottom-center"});
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Error logging out. Please try again.",{position: "bottom-center"});
    }
  }

  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-8 w-full">
      <NavLink to="/" className="text-xl font-bold">
        Quotes
      </NavLink>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex gap-x-4">
            <NavLink to="/" className={navLinkCss}>
              Home
            </NavLink>
            <NavLink to="/profile" className={navLinkCss}>
              Profile
            </NavLink>
            <button onClick={handleLogout} className={navLinkCss}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <NavLink to="/login" className={navLinkCss}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkCss}>
              Signup
            </NavLink>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
