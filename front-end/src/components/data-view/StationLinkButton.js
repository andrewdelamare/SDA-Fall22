import { Link } from "react-router-dom";
export const StationLinkButton = ({ name, id, reset }) => {
  const stringId = id < 10 ? `00${id}` : id < 100 ? `0${id}` : id;

  return (
    <Link
      className="inline-block bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
      to={`/stations/${stringId}`}
      onClick={() => reset()}
    >
      {name}
    </Link>
  );
};