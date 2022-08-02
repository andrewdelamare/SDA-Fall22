import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStations } from "../services/stationService";
import { PageSelector } from "./PageSelector";
import { OrderButton } from "./OrderButton";
import { Spinner } from "./Spinner";
import { SearchBar } from "./SearchBar";

const StationRow = ({ station }) => {
  return (
    <tr
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-600 "
      alt="Station row, clickable link to station view"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium transition duration-300 ease-in-out">
        <Link className="hover:underline" to={`${station.stationId}`}>
          {station.name}
        </Link>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        {`${station.osoite}, ${
          station.kaupunki === " " ? "Helsinki" : station.kaupunki
        }`}
      </td>
    </tr>
  );
};

const StationTable = ({
  stations,
  page,
  changeOrder,
  name,
  address,
  count,
}) => {
  const stationsPage =
    stations !== undefined
      ? stations.slice((page - 1) * 50, page * 50)
      : stations;
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
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
                  >
                    <div className="m-2">Name</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={name}
                      col={"name"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    <div className="m-2">Address</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={address}
                      col={"address"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {count === null ? (
                  <tr className="w-full flex justify-center m-4">
                    <td>
                      <Spinner />
                    </td>
                  </tr>
                ) : stationsPage !== undefined ? (
                  stationsPage.map((station) => (
                    <StationRow key={station._id} station={station} />
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Stations = () => {
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [name, setName] = useState("+");
  const [address, setAddr] = useState("+");
  const [filtered, setFiltered] = useState([]);

  const changePage = (direction) => {
    direction === "+" && page < Math.floor(count / 50) + 1
      ? setPage(page + 1)
      : direction === "-" && page !== 1
      ? setPage(page - 1)
      : console.log("Invalid page");
  };

  const changeOrder = (col, order) => {
    switch (col) {
      case "name":
        const sortedStationsName =
          order === "+"
            ? filtered.sort((a, b) => a.name[0].localeCompare(b.name[0]))
            : filtered.sort((a, b) => b.name[0].localeCompare(a.name[0]));

        order === "+"
          ? setStations(
              stations.sort((a, b) => a.name[0].localeCompare(b.name[0]))
            )
          : setStations(
              stations.sort((a, b) => b.name[0].localeCompare(a.name[0]))
            );

        order === "+" ? setName("-") : setName("+");
        setStations(sortedStationsName);

        break;
      case "address":
        const sortedStationsAddr =
          order === "+"
            ? filtered.sort((a, b) => a.osoite[0].localeCompare(b.osoite[0]))
            : filtered.sort((a, b) => b.osoite[0].localeCompare(a.osoite[0]));
        order === "+"
          ? stations.sort((a, b) => a.osoite[0].localeCompare(b.osoite[0]))
          : stations.sort((a, b) => b.osoite[0].localeCompare(a.osoite[0]));

        order === "+" ? setAddr("-") : setAddr("+");
        setStations(sortedStationsAddr);
        break;
      default:
        break;
    }
  };

  const filterStations = (search, field) =>
    stations.filter((e) => {
      if ((search !== "") | (field !== "Search Field")) {
        switch (field) {
          case "name":
            return e.name.toLowerCase().includes(search.toLowerCase());
          case "address":
            return e.osoite.toLowerCase().includes(search.toLowerCase());
          default:
            return e.name.toLowerCase().includes(search.toLowerCase()) === true
              ? true
              : e.osoite.toLowerCase().includes(search.toLowerCase()) === true
              ? true
              : false;
        }
      } else {
        return e;
      }
    });

  const filterEvent = (search, field) => {
    const f = filterStations(search, field);
    setFiltered(f);
    setCount(f.length);
  };

  useEffect(() => {
    const getStat = async () => {
      const res = await getStations();
      const updatedStations = res;
      setStations(updatedStations);
      setFiltered(updatedStations);
      const estCount = res.length;
      setCount(estCount);
    };

    if (count === null) {
      getStat();
    }
  }, [count]);

  return (
    <div className=" mx-10 my-4 mt-[96px] flex flex-col">
      <div className="w-full flex justify-around mt-2"></div>
      {stations.length === 0 ? (
        <div></div>
      ) : (
        <SearchBar filterEvent={filterEvent} options={["Name", "Address"]} />
      )}
      <StationTable
        stations={filtered}
        page={page}
        name={name}
        address={address}
        changeOrder={changeOrder}
        count={count}
      />
      <PageSelector page={page} changePage={changePage} count={count} />
    </div>
  );
};
