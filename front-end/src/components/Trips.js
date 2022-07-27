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

const TripRow = ({ trip }) => {
  const minutes = Math.floor(trip.duration / 60);
  const seconds = trip.duration % 60;
  const stringTime =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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

const TripTable = ({ trips }) => {
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
                    Departure
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Return
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Duration (min:sec)
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Distance (km)
                  </th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <TripRow trip={trip} />
                ))}
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
  const setHour = (hour) => {
    setSelHour(hour);
  };
  const getTrips = async () => {
    //const toIso = selectedDay.toISOString();
    //const hourdate = addHours(selectedDay, selectedHour)
    //const hourdateiso = hourdate.toISOString()
    //console.log(toIso, hourdateiso)

    const dayPrim = selectedDay[Symbol.toPrimitive]("number");
    const res = await getTripsByDateHour(dayPrim, selectedHour);
    console.log(res);
    const updatedTrips = res[0].trips.map((trip) => trip);
    setTrips(updatedTrips);
  };
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
      <TripTable trips={trips} />
    </div>
  );
};
