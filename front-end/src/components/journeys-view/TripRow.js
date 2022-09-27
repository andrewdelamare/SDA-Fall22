import { Link } from "react-router-dom";

export const TripRow = ({ trip }) => {
  const minutes = Math.floor(trip.duration / 60);
  const seconds = trip.duration % 60;
  const stringTime =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  const stringDepId =
    trip.depId < 10
      ? `00${trip.depId}`
      : trip.depId < 100
      ? `0${trip.depId}`
      : trip.depId;
  const stringRetId =
    trip.retId < 10
      ? `00${trip.retId}`
      : trip.retId < 100
      ? `0${trip.retId}`
      : trip.retId;

  return (
    <tr
      key={trip._id}
      className="flex flex-col bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200 sm:table-row "
    >
      <td className="px-1 py-4 lg:whitespace-nowrap text-sm font-medium text-gray-900 duration-300 ease-in-out hidden sm:table-cell ">
        <Link
          className="hover:underline hover:text-blue-600"
          to={`/stations/${stringDepId}`}
        >
          {trip.depNm}
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-light px-1 py-4 lg:whitespace-nowrap duration-300 ease-in-out hidden sm:table-cell">
        <Link
          className="hover:underline hover:text-blue-600"
          to={`/stations/${stringRetId}`}
        >
          {trip.retNm}
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-light px-1 py-4 lg:whitespace-nowrap hidden sm:table-cell">
        {stringTime}
      </td>
      <td className="text-sm text-gray-900 font-light px-1 py-4 lg:whitespace-nowrap hidden sm:table-cell">
        {trip.distance / 1000}
      </td>
      <div className="font-light sm:hidden text-sm">
        Departure:
        <Link
          className="underline text-blue-600"
          to={`/stations/${stringDepId}`}
        >
          {trip.depNm}
        </Link>
      </div>
      <div className="font-light sm:hidden text-sm">
        Return:
        <Link
          className=" underline text-blue-600"
          to={`/stations/${stringRetId}`}
        >
          {trip.retNm}
        </Link>
      </div>
      <div className="sm:hidden font-light text-sm">Duration: {stringTime}</div>
      <div className="sm:hidden font-light text-sm">
        Distance (km): {trip.distance / 1000}
      </div>
    </tr>
  );
};
