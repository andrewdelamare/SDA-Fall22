import { Link, useNavigate } from "react-router-dom";
export const StationRow = ({ station }) => {
  const n = useNavigate();
  return (
    <tr
      className="
      bg-white border-b transition duration-300 ease-in-out flex flex-col
      sm:table-row
      hover:bg-blue-100 hover:text-blue-600 
      "
      alt="Station row, clickable link to station view"
      onClick={() => {
        n(`${station.stationId}`);
      }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium transition duration-300 ease-in-out">
        <Link className="hover:underline" to={`${station.stationId}`}>
          {station.name}
        </Link>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Link className="hover:underline" to={`${station.stationId}`}>
          {`${station.osoite}, ${
            station.kaupunki === " " ? "Helsinki" : station.kaupunki
          }`}
        </Link>
      </td>
    </tr>
  );
};
