import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import img1 from '../../public/google.png'
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

        toast.success("User logged in Successfully",{position: "bottom-center"});
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Failed to sign in with Google. Please try again.",{position: "bottom-center"});
    }
  }

  // function googleLogin() {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider).then(async (result) => {
  //     // console.log(result);
  //     const user = result.user;
  //     if (result.user) {
  //       await setDoc(doc(db, "Users", user.uid), {
  //         email: user.email,
  //         Name: user.displayName,
  //         photo: user.photoURL,
  //         favQuotes:quotes, 
  //       });
  //       toast.success("User logged in Successfully");
  //       navigate('/profile');
  //       // window.location.href = "/profile";
  //     }
  //   });
  // }

  return (
    <main className="w-full">
      <p className="text-center font-thin py-3">--Or continue with--</p>
      <div className="flexCenter cursor-pointer"
        onClick={googleLogin}
      >

        <div className="w-32">
          <img src={img1} alt="google_img"  />
        </div>
      </div>

    </main>
  );
}
export default SignInwithGoogle;



