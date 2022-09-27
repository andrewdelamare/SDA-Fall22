import { useState } from "react";
import { getTripsByDateHour } from "../../services/tripService";
import { PageSelector } from "../PageSelector";
import { SearchBar } from "../SearchBar";
import { DateSelector } from "./DateSelector";
import { TripTable } from "./TripTable";

export const Trips = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(2021, 4, 1));
  const [selectedHour, setSelHour] = useState(0);
  const [trips, setTrips] = useState([]);
  const [tripList, setTripList] = useState();
  const [depOrder, setDep] = useState("+");
  const [retOrder, setRet] = useState("+");
  const [disOrder, setDis] = useState("+");
  const [durOrder, setDur] = useState("+");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [filteredCount, setFCount] = useState(1);

  const changePage = (direction) => {
    direction === "+" && page < Math.floor(filteredCount / 50) + 1
      ? setPage(page + 1)
      : direction === "-" && page !== 1
      ? setPage(page - 1)
      : console.log("Invalid page");
  };

  const setHour = (hour) => {
    setSelHour(hour);
  };
  const getTrips = async () => {
    const dayPrim = selectedDay[Symbol.toPrimitive]("number");
    const res = await getTripsByDateHour(dayPrim, selectedHour);
    const updatedTrips = res[0].trips.map((trip) => trip);
    setTrips(updatedTrips);
    setTripList(updatedTrips.map((trip) => trip));
    setFiltered(updatedTrips);
    setFCount(updatedTrips.length);
  };

  const changeOrder = (col, order) => {
    switch (col) {
      case "depNm":
        const sortedTripsDep =
          order === "+"
            ? filtered.sort((a, b) => a.depNm[0].localeCompare(b.depNm[0]))
            : filtered.sort((a, b) => b.depNm[0].localeCompare(a.depNm[0]));

        order === "+" ? setDep("-") : setDep("+");
        order === "+"
          ? setTrips(trips.sort((a, b) => a.depNm[0].localeCompare(b.depNm[0])))
          : setTrips(
              trips.sort((a, b) => b.depNm[0].localeCompare(a.depNm[0]))
            );
        setTripList(sortedTripsDep);

        break;
      case "retNm":
        const sortedTripsRet =
          order === "+"
            ? filtered.sort((a, b) => a.retNm[0].localeCompare(b.retNm[0]))
            : filtered.sort((a, b) => b.retNm[0].localeCompare(a.retNm[0]));
        order === "+" ? setRet("-") : setRet("+");
        order === "+"
          ? setTrips(trips.sort((a, b) => a.retNm[0].localeCompare(b.retNm[0])))
          : setTrips(
              trips.sort((a, b) => b.retNm[0].localeCompare(a.retNm[0]))
            );

        setTripList(sortedTripsRet);

        break;
      case "distance":
        const sortedTripsDis =
          order === "+"
            ? filtered.sort((a, b) => a.distance - b.distance)
            : filtered.sort((a, b) => b.distance - a.distance);
        order === "+" ? setDis("-") : setDis("+");
        order === "+"
          ? setTrips(trips.sort((a, b) => a.distance - b.distance))
          : setTrips(trips.sort((a, b) => b.distance - a.distance));
        setTripList(sortedTripsDis);

        break;
      case "duration":
        const sortedTripsDur =
          order === "+"
            ? filtered.sort((a, b) => a.duration - b.duration)
            : filtered.sort((a, b) => b.duration - a.duration);
        order === "+" ? setDur("-") : setDur("+");
        order === "+"
          ? setTrips(trips.sort((a, b) => a.duration - b.duration))
          : setTrips(trips.sort((a, b) => b.duration - a.duration));
        setTripList(sortedTripsDur);

        break;
      default:
        break;
    }
  };

  const filterTrips = (search, field) =>
    trips.filter((e) => {
      if (search !== "") {
        switch (field) {
          case "departure":
            return e.depNm.toLowerCase().includes(search.toLowerCase());
          case "return":
            return e.retNm.toLowerCase().includes(search.toLowerCase());
          case "duration":
            const minutes = Math.floor(e.duration / 60);
            const seconds = e.duration % 60;
            const stringTime =
              seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
            return stringTime.includes(search.toLowerCase());
          case "distance":
            return (e.distance / 1000)
              .toString()
              .includes(search.toLowerCase());
          default:
            return e.depNm.toLowerCase().includes(search.toLowerCase()) === true
              ? true
              : e.retNm.toLowerCase().includes(search.toLowerCase()) === true
              ? true
              : false;
        }
      } else {
        return e;
      }
    });

  const filterEvent = (search, field) => {
    const f = filterTrips(search, field);
    setFiltered(f);
    setTripList(f.map((trip) => trip));
    setFCount(f.length);
  };
  return (
    <div className=" mx-10 my-4 flex flex-col">
      <div className="w-full flex justify-around">
        <DateSelector
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedHour={selectedHour}
          setHour={setHour}
          getTrips={getTrips}
        />
      </div>
      {trips.length !== 0 ? (
        <SearchBar
          options={["Departure", "Return", "Duration", "Distance"]}
          filterEvent={filterEvent}
        />
      ) : (
        <div></div>
      )}
      <TripTable
        tripList={tripList}
        page={page}
        changeOrder={changeOrder}
        depOrder={depOrder}
        retOrder={retOrder}
        disOrder={disOrder}
        durOrder={durOrder}
      />
      <PageSelector page={page} changePage={changePage} count={filteredCount} />
    </div>
  );
};
