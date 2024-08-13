import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.js";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    } catch (err) {
      console.log("Error in fetchUserData:", err);
    }
  };

  const removeFav = async (quote) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        await updateDoc(userDocRef, {
          favQuotes: arrayRemove(quote),
        });
        toast.success("Quote removed from favorites!",{position: "bottom-center"});
        fetchUserData(); // Refresh user data
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error in removeFav:", err);
      toast.error("Failed to remove quote from favorites",{position: "bottom-center"});
    }
  };

  return (
    <section className="flexCenter flex-col mt-[5vh] gap-5 max-w-[790px] mx-auto px-3  pb-[10vh]">
      {userDetails ? (
        <>
          <h2 className="text-center text-2xl font-semibold text-purple-500">
            Profile
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "10%" }}
            />
          </div>
          <div className="flex flex-col gap-5 text-center text-sm">
            <h3>Welcome {userDetails.Name}</h3>
            <p>Email → {userDetails.email}</p>
            <p>Full Name → {userDetails.Name}</p>
          </div>

          {userDetails.favQuotes && userDetails.favQuotes.length > 0 && (
            <main className="border-t-[1px] border-black px-2 text-center mt-3 sm:min-w-[620px] min-w-full">
              <h2 className="py-4 font-semibold text-xl">
                All Your 💖 Favorite Quotes
              </h2>
              <div className="flex justify-center items-start flex-col gap-3 gap-y-2 text-sm">
                {userDetails.favQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className="text-left flex justify-between w-full gap-x-2 leading-7 border-slate-400 border-b pb-3"
                  >
                    <p>{quote}</p>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => removeFav(quote)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </main>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}

    </section>
  );
}

export default Profile;
