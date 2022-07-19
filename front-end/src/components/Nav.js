import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <nav className="flex justify-between fixed z-20 bg-stone-200 top-0 w-full ">
      <div className="m-7 text-xl sm:text-4xl font-serif ">
        Helsinki City Bike App
      </div>
      <div className="flex flex-row justify-between m-7 items-center">
        <Link to="/" className="inline-flex border-0 px-5 focus:outline-none">
          Home
        </Link>

        <Link
          to="/data"
          className="inline-flex border-0 px-5  focus:outline-none"
        >
          Data Overview
        </Link>

        <Link
          to="/trips"
          className="inline-flex border-0 px-5 focus:outline-none"
        >
          Trips
        </Link>

        <Link
          to="/stations"
          className="inline-flex border-0 px-5  focus:outline-none"
        >
          Stations
        </Link>
        <Link
          to="/import"
          className="inline-flex border-0 px-5  focus:outline-none"
        >
          Import
        </Link>
      </div>
    </nav>
  );
};
