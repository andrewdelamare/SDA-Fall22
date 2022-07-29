import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStations } from "../services/stationService";

const StationRow = ({ station }) => {
  const navigate = useNavigate();
  const goToStation = (id) => {
    navigate(`${station.stationId}`);
  };

  return (
    <tr
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
      onClick={() => goToStation(station.id)}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {station.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {`${station.osoite}, ${
          station.kaupunki === " " ? "Helsinki" : station.kaupunki
        }`}
      </td>
    </tr>
  );
};

const StationTable = ({ stations }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, i) => (
                  <StationRow key={i} station={station} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageSelector = ({ page, changePage, count }) => {
  return (
    <div className="flex justify-center">
      <nav>
        <ul className="flex list-style-none">
          <li className="">
            <button
              className="text-sm py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 hover:bg-gray-200"
              onClick={() => changePage("-")}
            >
              Previous
            </button>
          </li>
          <li className="">
            <button className="text-sm py-1 px-2 relative block border-0 bg-stone-500 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-stone-600 ">{`${page}/${
              Math.floor(count / 100) + 1
            }`}</button>
          </li>

          <li className="">
            <button
              className="text-sm py-1 px-2 relative block border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200"
              onClick={() => changePage("+")}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Stations = () => {
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(500);

  const changePage = (direction) => {
    direction === "+" && page < Math.floor(count / 100) + 1
      ? setPage(page + 1)
      : direction === "-" && page !== 1
      ? setPage(page - 1)
      : console.log("Invalid page");
  };

  useEffect(() => {
    const getStat = async () => {
      const res = await getStations(page - 1);
      const updatedStations = res[0];
      setStations(updatedStations);
      const estCount = res[1];
      setCount(estCount);
    };
    getStat();
  }, [page]);

  return (
    <div className=" mx-10 my-4 mt-[96px] flex flex-col">
      <div className="w-full flex justify-around"></div>
      <StationTable stations={stations} />
      <PageSelector page={page} changePage={changePage} count={count} />
    </div>
  );
};
