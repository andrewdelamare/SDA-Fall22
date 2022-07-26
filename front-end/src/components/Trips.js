import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
const Hour = ({ selectedHour, setHour, time }) => {
  return <button onClick={() => setHour(time)}>{`${time}:00`}</button>;
};

const HourSelector = ({ selectedHour, setHour }) => {
  const arr = [
    0, 12, 1, 13, 2, 14, 3, 15, 4, 16, 5, 17, 6, 18, 7, 19, 8, 20, 9, 21, 10,
    22, 11, 23,
  ];
  return (
    <div className="absolute lg:left-[60%]">
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

export const Trips = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(2021, 3, 30));
  const [selectedHour, setSelHour] = useState(0);
  const setHour = (hour) => {
    setSelHour(hour);
  };
  return (
    <div className=" mx-10 my-4 mt-[96px] flex justify-around">
      <div className="flex border-2 border-black w-2/3 h-[420px] m-10 p-8  ">
        <div className="flex ">
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div>
        <div className="flex ">
          <HourSelector selectedHour={selectedHour} setHour={setHour} />
        </div>
      </div>
    </div>
  );
};
