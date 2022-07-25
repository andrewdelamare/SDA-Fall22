import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
export const Trips = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(2021, 4, 1));
  console.log(selectedDay);
  return (
    <div className="flex flex-col mt-[96px]">
      <div>
        <h2>Trips</h2>
      </div>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </div>
  );
};
