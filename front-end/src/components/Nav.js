import { useState } from "react";
import { Link } from "react-router-dom";
export const NavBar = () => {
  const [viz, setViz] = useState(false);
  return (
    <div
      className="
    relative w-full flex flex-wrap items-top justify-between px-4 py-4
    "
    >
      <div
        className="
      flex text-2xl pr-2 h-[43px] py-2 font-serif
      md:text-2xl md:my-auto
      lg:text-3xl  "
      >
        <Link to="/">City Bike App</Link>
      </div>
      <div
        className="
      hidden 
      md:visible md:flex md:flex-row md:justify-between md:pr-4 md:items-center
      "
      >
        <Link to="/" className="inline-flex border-0 pr-5 focus:outline-none">
          Home
        </Link>

        <Link
          to="/data"
          className="inline-flex border-0 px-5 focus:outline-none"
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
          className="inline-flex border-0 px-5 focus:outline-none"
        >
          Stations
        </Link>
        <Link
          to="/upload"
          className="inline-flex border-0 pl-5 focus:outline-none"
        >
          Import
        </Link>
      </div>
      <div
        className="
      flex flex-col mx-2 items-end 
      md:hidden
      "
      >
        <button
          className="
      text-gray-500 border-0 py-2 bg-transparent w-6 mr-3
      hover:shadow-none hover:no-underline 
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
      md:hidden"
          type="button"
          aria-label="Toggle dropdown nav"
          onClick={() => setViz(!viz)}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <ul
          className={`
        ${viz === true ? "visible" : "hidden"}
          flex flex-col items-end pr-3 text-lg
          md:hidden
      `}
        >
          <li>
            <Link to="/" className="inline-flex border-0 focus:outline-none">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/data"
              className="inline-flex border-0 focus:outline-none"
            >
              Data
            </Link>
          </li>
          <li>
            <Link
              to="/trips"
              className="inline-flex border-0 focus:outline-none"
            >
              Journeys
            </Link>
          </li>
          <li>
            <Link
              to="/stations"
              className="inline-flex border-0 focus:outline-none"
            >
              Stations
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="inline-flex border-0  focus:outline-none"
            >
              Import
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
