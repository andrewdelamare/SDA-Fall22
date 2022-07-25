import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
export const Trips = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(2021, 3, 30));
  return (
    <div className="flex flex-col mt-[96px]">
      <div></div>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </div>
  );
};
