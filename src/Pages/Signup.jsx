import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../services/firebase.js"
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import SignInwithGoogle from "../components/SignInwithGoogle.jsx";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const quotes = [];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // console.log("auth → ",auth);
      // console.log("user → ", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Name: name,
          favQuotes:quotes, 
          photo: "",
        });
      }
      // console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!",{position: "bottom-center"});
      navigate("/profile");
    } catch (error) {
      console.log("err in handleSignUp fun → ", error.message);
      toast.error(error.message,{position: "bottom-center"});
    }
  };


  return (
    <section className="mx-auto px-4 flexCenter">
      <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[10vh] rounded-xl font-bold text-sm">
        <form onSubmit={handleSignUp}>
          <h3 className="text-center text-2xl pb-5 font-semibold text-blue-400">Sign up</h3>

          <div className="flex flex-col gap-y-3">
            {/* <label className="text-sm font-extrabold">Full Name</label> */}
            <input
              type="text"
              className="border p-2 rounded-lg h-9  "
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4 h-9">
            {/* <label className="text-sm font-extrabold">Email address</label> */}
            <input
              type="email"
              className="border-[0.1px] p-2 rounded-lg focus:border-black"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4">
            {/* <label className="text-sm font-extrabold">Password</label> */}
            <input
              type="password"
              className="border p-2 rounded-lg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full"
          >
            Sign Up
          </button>


          <p className="text-center text-sm mt-5">
            Already registered?{" "}
            <span onClick={() => navigate('/login')} className="text-blue-500 hover:cursor-pointer
            ">
              Login
            </span>
          </p>

          <SignInwithGoogle />

        </form>
      </main>

    </section>
  );
}
export default SignUp;
