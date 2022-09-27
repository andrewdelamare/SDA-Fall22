import { useEffect, useState } from "react";
import { getStations } from "../../services/stationService";
import { PageSelector } from "../PageSelector";
import { SearchBar } from "../SearchBar";
import { StationTable } from "./StationTable";

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
    <div className=" mx-10 my-4 flex flex-col">
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
