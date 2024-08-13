import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../services/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SignInwithGoogle from "../components/SignInwithGoogle.jsx";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const quotes = [];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the sign-up process

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Name: name,
          favQuotes: quotes,
          photo: "",
        });
        toast.success("User Registered Successfully!!", { position: "bottom-center" });
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
      console.error("Error in handleSignUp:", error.message);
    } finally {
      setLoading(false); // Reset loading to false once the process is complete
    }
  };

  return (
    <section className="mx-auto px-4 flexCenter">
      <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm">
        <form onSubmit={handleSignUp}>
          <h3 className="text-center text-2xl pb-5 font-semibold text-blue-400">Sign up</h3>

          <div className="flex flex-col gap-y-3">
            <input
              type="text"
              className="border p-2 rounded-lg h-9"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4 h-9">
            <input
              type="email"
              className="border-[0.1px] p-2 rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-4">
            <input
              type="password"
              className="border p-2 rounded-lg"
              placeholder="Password"
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm mt-5">
            Already registered?{" "}
            <span onClick={() => navigate('/login')} className="text-blue-500 hover:cursor-pointer">
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
