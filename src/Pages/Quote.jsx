import { auth, db } from "../services/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const btnCSS =
  "mt-3 border-[1.2px] border-black rounded-2xl p-2 hover:scale-105 hover:transition-all text-sm";

const QuotePg = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(res.data[0]); // Assuming the response is an array with one quote
      setLoading(false);
    } catch (err) {
      console.log("error while fetching quote → ", err);
      setLoading(false);
    }
  };

  const handleFav = async () => {
    // console.log("handleFav called → ");
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        await updateDoc(userDocRef, {
          favQuotes: arrayUnion(quote)
        });
        toast('💖 Quote added to favorites!',{position: "bottom-center"} );
      } else {
        console.log("User is not logged in");
        toast.error("Please Login first!",{position: "bottom-center"});
        navigate('/login');
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to add quote to favorites",{position: "bottom-center"});
    }
  };

  return (
    <section className="mt-16 mx-auto flexCenter flex-col max-w-[640px] px-4 sm:px-6 gap-6">
      <h2 className="text-3xl font-semibold text-purple-500">
        Quote of the day{" "}
      </h2>
      {loading ? (
        <h2 className="min-h-[15vh] mt-[15vh]">Loading...</h2>
      ) : (
        <p className="text-md leading-10 min-h-[30vh] text-center sm:text-xl text-base">
          {quote}
        </p>
      )}
      <button className={btnCSS} onClick={fetchData}>
        Generate new Quote
      </button>

      <button className={btnCSS} onClick={handleFav}>
        Favorite 💖 this quote!
      </button>

    </section>
  );
};

export default QuotePg;
