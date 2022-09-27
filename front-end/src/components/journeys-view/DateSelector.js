import { HourSelector } from "./HourSelector";
import { Calendar } from "./calendar/Calendar";

export const DateSelector = ({
  selectedDay,
  setSelectedDay,
  selectedHour,
  setHour,
  getTrips,
}) => {
  return (
    <div className="flex flex-col items-center md:flex-row w-full lg:w-2/3 md:h-[420px] m-10 p-8  ">
      <div className="flex ">
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>

      <HourSelector selectedHour={selectedHour} setHour={setHour} />

      <button
        className="
        left-[47%] top-[500px] border-2 border-slate-800 p-2 rounded-lg shadow-md 
        md:absolute 
        hover:bg-stone-200 hover:shadow-md
        active:bg-stone-400 active:shadow-sm
        "
        onClick={() => getTrips()}
      >
        Get Journeys
      </button>
    </div>
  );
};
