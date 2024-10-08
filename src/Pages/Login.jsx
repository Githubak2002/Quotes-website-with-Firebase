import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../services/firebase.js";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "../components/SignInwithGoogle.jsx";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully", {
        position: "bottom-center",
        className: "text-xs"
      });
      navigate("/profile");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center", className: "text-xs" });
      // console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto px-4 flexCenter flex-col gap-6">
      <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-2xl pb-5 font-semibold text-blue-400">
            Login
          </h3>

          <div className="flex flex-col gap-y-3">
            <input
              type="email"
              className="border p-2 rounded-lg h-9"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4">
            <input
              type="password"
              className="border p-2 rounded-lg h-9"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>

          <p className="text-sm mt-5">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>

          <button
            className="text-xs mt-5 text-slate-500 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forget Password
          </button>
        </form>

        <SignInwithGoogle />
      </main>

      <div className="text-sm text-[#9f9f9f] flex flex-col gap-2">
        <h2>Email → tmp@gmail.com</h2>
        <h2>Password → 123456</h2>
      </div>
    </section>
  );
}

export default Login;
