import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "./SignInwithGoogle.jsx";

import toast from "react-hot-toast";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("User logged in Successfully");
      toast.success("User logged in Successfully",{position: "bottom-center"});
      navigate("/profile");
      // window.location.href = "/profile";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message,{position: "bottom-center"});
    }
  };

  return (
    <section className="mx-auto px-4 flexCenter">
      <main className="sm:min-w-[420px] min-w-full shadow-2xl py-6 px-10 border mt-[10vh] rounded-2xl font-bold">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-2xl pb-5 text-blue-400">Login</h3>

          <div className="flex flex-col gap-y-3">
            <label className="text-sm font-extrabold">Email address</label>
            <input
              type="email"
              className="border p-2 rounded-lg"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4">
            <label className="text-sm font-extrabold">Password</label>
            <input
              type="password"
              className="border p-2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full"
          >
            Submit
          </button>

          <p className="text-center text-sm mt-3">
            New user{" "}
            <span onClick={() => navigate('/register')} className="text-blue-500">
              Register Here
            </span>
          </p>
        </form>


        {/* ======== Cors issues frm firebase with popup ======= */}
        {/* <SignInwithGoogle /> */}

      </main>

    </section>
  );
}

export default Login;
