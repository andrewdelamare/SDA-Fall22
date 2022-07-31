import { useState } from "react";
import { getTripsByDateHour } from "../services/tripService";
import { Calendar } from "./Calendar";
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
    <div className="absolute left-[70%] lg:left-[60%]">
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
    <div className="flex border-2 border-black w-full lg:w-2/3 h-[420px] m-10 p-8  ">
      <div className="flex ">
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>
      <div className="flex ">
        <HourSelector selectedHour={selectedHour} setHour={setHour} />
      </div>
      <button
        className="absolute left-[47%] top-[500px] border-2 border-black p-2 hover:bg-stone-200 active:bg-stone-400 "
        onClick={() => getTrips()}
      >
        Get Trips
      </button>
    </div>
  );
};

const TripRow = ({ trip, i }) => {
  const minutes = Math.floor(trip.duration / 60);
  const seconds = trip.duration % 60;
  const stringTime =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

  return (
    <tr
      key={trip._id}
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {trip.depNm}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {trip.retNm}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {stringTime}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {trip.duration / 1000}
      </td>
    </tr>
  );
};

const OrderButton = ({ changeOrder, order, col }) => {
  if (order === "+") {
    return (
      <button type="button" onClick={() => changeOrder(col, "+")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible rotate-180"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
    );
  } else if (order === "-") {
    return (
      <button type="button" onClick={() => changeOrder(col, "-")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
    );
  } else {
    return (
      <button type="button" onClick={() => changeOrder(col, "+")}>
        <svg
          width="6"
          height="3"
          className="m-2 overflow-visible rotate-180"
          aria-hidden="true"
        >
          <path
            d="M0 0L3 3L6 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
    );
  }
};

const TripTable = ({
  tripList,
  changeOrder,
  depOrder,
  retOrder,
  disOrder,
  durOrder,
}) => {
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
                    <div className="m-2"> Departure</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={depOrder}
                      col={"depNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
                  >
                    <div className="m-2"> Return</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={retOrder}
                      col={"retNm"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
                  >
                    <div className="m-2"> Duration</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={durOrder}
                      col={"duration"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
                  >
                    <div className="m-2"> Distance</div>
                    <OrderButton
                      changeOrder={changeOrder}
                      order={disOrder}
                      col={"distance"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>{tripList}</tbody>
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

  const setHour = (hour) => {
    setSelHour(hour);
  };
  const getTrips = async () => {
    const dayPrim = selectedDay[Symbol.toPrimitive]("number");
    const res = await getTripsByDateHour(dayPrim, selectedHour);
    console.log(res);
    const updatedTrips = res[0].trips.map((trip) => trip);
    setTrips(updatedTrips);
    setTripList(
      updatedTrips.map((trip) => <TripRow key={trip._id} trip={trip} />)
    );
  };

  const changeOrder = (col, order) => {
    switch (col) {
      case "depNm":
        const sortedTripsDep =
          order === "+"
            ? trips.sort((a, b) => a.depNm[0].localeCompare(b.depNm[0]))
            : trips.sort((a, b) => b.depNm[0].localeCompare(a.depNm[0]));

        order === "+" ? setDep("-") : setDep("+");
        setTripList(
          sortedTripsDep.map((trip) => <TripRow key={trip._id} trip={trip} />)
        );

        break;
      case "retNm":
        const sortedTripsRet =
          order === "+"
            ? trips.sort((a, b) => a.retNm[0].localeCompare(b.retNm[0]))
            : trips.sort((a, b) => b.retNm[0].localeCompare(a.retNm[0]));
        order === "+" ? setRet("-") : setRet("+");
        setTripList(
          sortedTripsRet.map((trip) => <TripRow key={trip._id} trip={trip} />)
        );

        break;
      case "distance":
        const sortedTripsDis =
          order === "+"
            ? trips.sort((a, b) => a.distance - b.distance)
            : trips.sort((a, b) => b.distance - a.distance);
        order === "+" ? setDis("-") : setDis("+");
        setTripList(
          sortedTripsDis.map((trip) => <TripRow key={trip._id} trip={trip} />)
        );

        break;
      case "duration":
        const sortedTripsDur =
          order === "+"
            ? trips.sort((a, b) => a.duration - b.duration)
            : trips.sort((a, b) => b.duration - a.duration);
        order === "+" ? setDur("-") : setDur("+");
        setTripList(
          sortedTripsDur.map((trip, i) => (
            <TripRow key={trip._id} trip={trip} i={i} />
          ))
        );

        break;
      default:
        break;
    }
  };

  console.log(tripList);
  return (
    <div className=" mx-10 my-4 mt-[96px] flex flex-col">
      <div className="w-full flex justify-around">
        <DateSelector
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedHour={selectedHour}
          setHour={setHour}
          getTrips={getTrips}
        />
      </div>
      <TripTable
        tripList={tripList}
        changeOrder={changeOrder}
        depOrder={depOrder}
        retOrder={retOrder}
        disOrder={disOrder}
        durOrder={durOrder}
      />
    </div>
  );
};
