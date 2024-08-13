
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return ( 
    <section className="flexCenter h-[80vh] flex-col gap-5">
      <h1 className=" text-red-500">404: Page Not Found</h1>
      <Link to='/' className="text-blue-500"> Home </Link>
    </section>
   );
}
 
export default PageNotFound;