import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function SignInwithGoogle() {
  const navigate = useNavigate();
  const quotes = [];

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("user: ",user);

      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            Name: user.displayName,
            photo: user.photoURL,
            favQuotes: quotes,
          });
        }

        toast.success("User logged in Successfully", {
          position: "bottom-center",
        });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Failed to sign in with Google. Please try again.", {
        position: "bottom-center",
      });
    }
  }

  return (
    <main className="w-full">
      <div className="relative flexCenter py-6">
        <span className="absolute px-2 bg-white text-gray-700 z-10 text-xs">OR CONTINUE WITH</span>
        <div className="absolute inset-x-0 border-t border-gray-400 border-1"></div>
      </div>

      {/* <p className="text-center font-thin py-3">--Or continue with--</p> */}

      <div
        className="flexCenter cursor-pointer border border-slate-300 p-2 mb-3 rounded-lg"
        onClick={googleLogin}
      >
        <div className="w-full flexCenter text-xs">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="LgbsSe-Bz112c w-5 mr-2"
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>

          <h2>Continue with Google</h2>
        </div>
      </div>
    </main>
  );
}

export default SignInwithGoogle;
