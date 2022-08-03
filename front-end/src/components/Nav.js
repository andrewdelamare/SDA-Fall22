import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <nav className="flex justify-between fixed z-20 bg-stone-200 top-0 w-full ">
      <div className="m-7 sm:text-xl md:text-2xl lg:text-3xl font-serif ">
        <Link to="/">Helsinki City Bike App</Link>
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
          Journeys
        </Link>

        <Link
          to="/stations"
          className="inline-flex border-0 px-5  focus:outline-none"
        >
          Stations
        </Link>
        <Link
          to="/upload"
          className="inline-flex border-0 px-5  focus:outline-none"
        >
          Import
        </Link>
      </div>
    </nav>
  );
};
