import { useState } from "react";
import { getTripsByDateHour } from "../services/tripService";
import { Calendar } from "./Calendar";
import { OrderButton } from "./OrderButton";
import { PageSelector } from "./PageSelector";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
const Hour = ({ selectedHour, setHour, time }) => {
  const styles = selectedHour === time ? "text-white bg-black rounded-xl" : "";
  return (
    <button
      className={styles}
      onClick={() => setHour(time)}
    >{`${time}:00`}</button>
  );
};

const HourSelector = ({ selectedHour, setHour }) => {
  const arr = [
    0, 12, 1, 13, 2, 14, 3, 15, 4, 16, 5, 17, 6, 18, 7, 19, 8, 20, 9, 21, 10,
    22, 11, 23,
  ];
  return (
    <div
      className="
    md:absolute md:left-[70%] lg:left-[60%]
    "
    >
      <div className="text-sm md:text-md w-full text-center">
        Departure Hour
      </div>
      <div className="grid grid-cols-2 grid-rows-[repeat(12,25px)] gap-x-2 mx-10 my-4 w-24 text-sm">
        {arr.map((hour) => (
          <Hour
            key={hour}
            selectedHour={selectedHour}
            setHour={setHour}
            time={hour}
          />
        ))}
      </div>
    </div>
  );
};

const DateSelector = ({
  selectedDay,
  setSelectedDay,
  selectedHour,
  setHour,
  getTrips,
}) => {
  return (
    <div className="flex flex-col items-center md:flex-row border-2 border-black w-full lg:w-2/3 md:h-[420px] m-10 p-8  ">
      <div className="flex ">
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>

      <HourSelector selectedHour={selectedHour} setHour={setHour} />

      <button
        className="
        left-[47%] top-[500px] border-2 border-black p-2 
        md:absolute 
        hover:bg-stone-200 
        active:bg-stone-400 
        "
        onClick={() => getTrips()}
      >
        Get Trips
      </button>
    </div>
  );
};

const TripRow = ({ trip }) => {
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
      <div className="sm:hidden font-light text-sm">
      Duration: {stringTime}
      </div>
      <div className="sm:hidden font-light text-sm">
      Distance (km): {trip.distance / 1000}
      </div>
    </tr>
  );
};

const TripTable = ({
  tripList,
  changeOrder,
  depOrder,
  retOrder,
  disOrder,
  durOrder,
  page,
}) => {
  const tripsPage =
    tripList !== undefined
      ? tripList.slice((page - 1) * 50, page * 50)
      : tripList;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-2 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr className="flex sm:table-row">
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                  >
                    <div className="mt-2 sm:m-2"> Departure</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={depOrder}
                      col={"depNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Return</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={retOrder}
                      col={"retNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Duration</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={durOrder}
                      col={"duration"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left "
                  >
                    <div className="mt-2 sm:m-2"> Distance</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={disOrder}
                      col={"distance"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripsPage !== undefined ? (
                  tripsPage.map((trip) => (
                    <TripRow key={trip._id} trip={trip} />
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
        console.log("nothing happening");
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
