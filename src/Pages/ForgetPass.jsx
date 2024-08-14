import {
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { db } from "../services/firebase.js";
import {
  collection,
  getDoc,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import SignInwithGoogle from "../components/SignInwithGoogle.jsx";

const ForgetPass = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [emailForPassReset, setEmailForPassReset] = useState("");
  const [loading, setLoading] = useState(false);

  /** === Email exists? ===
  const handleForgetPass = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {

      const email = emailForPassReset.trim();

      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        email
      );
      console.log(signInMethods);
      if (signInMethods.length === 0) {
        toast.error("Email does not exist. Please sign up.", {
          position: "bottom-center",
          className:"text-xs"
        });
        setLoading(false);
        return;
      }

      // If the user exists, send the password reset email
      await sendPasswordResetEmail(auth, emailForPassReset);
      toast.success("Password reset email sent", {
        position: "bottom-center",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
      console.error("Error sending password reset email - ", error);
    } finally {
      setLoading(false);
    }
  };
  */


  const handleForgetPass = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailForPassReset);
      toast.success("Password reset email sent", {
        position: "bottom-center",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
      console.error("Error sending password reset email - ", error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <section className="mx-auto px-4 flexCenter">
      <div className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[15vh] rounded-xl font-bold text-sm flexCenter flex-col gap-y-3">
        <form onSubmit={handleForgetPass}>
          <h2 className="text-center text-2xl pb-5 font-semibold text-blue-400">
            Forget Password
          </h2>
          <input
            type="email"
            className="border p-2 rounded-lg h-9 w-full"
            placeholder="Enter Email"
            onChange={(e) => setEmailForPassReset(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

        {/* === Don't have an account ===  */}
        <p className="text-xs mt-4 mb-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        {/* === Google ===  */}
        <SignInwithGoogle />
      </div>
    </section>
  );
};

export default ForgetPass;
