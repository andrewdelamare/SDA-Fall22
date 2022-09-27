import {
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { Day } from "./Day";

export const Month = ({ month, className, selectedDay, selectDay }) => {
  const intYr = month.yr;
  const intMon = month.mon < 10 ? `0${month.mon}` : month.mon;
  const day = parseISO(`${intYr}-${intMon}-15`);
  const start = startOfMonth(day);
  const end = endOfMonth(day);

  const allDays = eachDayOfInterval({
    start: start,
    end: end,
  });
  const dayLetterStyle =
    "place-self-center justify-around place-items-center flex w-8 h-8";
  const dayLetterArr = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className={`${className} h-[300px] md:h-[350px]`}>
      <div className="flex">
        <h1 className="self-center md:text-xl mx-auto ">
          {day.toLocaleString("default", { month: "long", year: "numeric" })}
        </h1>
      </div>

      <div className="grid grid-cols-7 pt-3 mx-12 md:mx-4 md:gap-3">
        {dayLetterArr.map((d) => (
          <div className={dayLetterStyle}>{d}</div>
        ))}
      </div>
      <div className="grid md:gap-3 grid-cols-7 pt-3 md:mx-4 mx-12 ">
        {allDays.map((day) => (
          <Day
            day={day}
            key={day}
            selectDay={selectDay}
            selectedDay={selectedDay}
          />
        ))}
      </div>
    </div>
  );
};