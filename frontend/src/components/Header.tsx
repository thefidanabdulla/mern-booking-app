import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 sm:px-0 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row  justify-between items-center gap-3">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" >MernHolidays.com</Link>
        </span>
        <span className="flex flex-col sm:flex-row gap-2 md:gap-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-base text-white px-3 font-bold hover:bg-blue-600"
                to={"/my-bookings"}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-base text-white px-3 font-bold hover:bg-blue-600"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 px-3 font-semibold bg-white transition-all hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
