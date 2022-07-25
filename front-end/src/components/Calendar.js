import {
  getMonth,
  eachDayOfInterval,
  getYear,
  startOfMonth,
  endOfMonth,
  parseISO,
  endOfDay,
  startOfDay,
  toDate,
} from "date-fns";
import { startOfToday } from "date-fns";
import { useEffect, useState } from "react";

// ------------------------------------------------------------------------

const Day = ({ selectDay, day, selectedDay }) => {
  const today = new Date(2021, 3, 30);
  const end = new Date(2021, 7, 1);
  const dayOfWeek = day.getDay();
  let sel = startOfDay(day).getTime() === selectedDay.getTime() ? true : false;

  let stylez = "";
  switch (dayOfWeek) {
    case 0:
      stylez =
        "col-start-1 col-end-1 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 1:
      stylez =
        "col-start-2 col-end-2 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 2:
      stylez =
        "col-start-3 col-end-3 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 3:
      stylez =
        "col-start-4 col-end-4 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 4:
      stylez =
        "col-start-5 col-end-5 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 5:
      stylez =
        "col-start-6 col-end-6 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    case 6:
      stylez =
        "col-start-7 col-end-7 w-8 h-8 place-self-center justify-around place-items-center flex";
      break;
    default:
      stylez = "";
      break;
  }

  const selectDayClick = () => {
    day < today
      ? console.log("no data for this day, please select another")
      : day > end
      ? console.log("no data for this day, please select another")
      : selectDay(day);
  };
  const selected = "bg-black text-white rounded-full";
  let selStylez = sel !== false ? selected : "";

  const invalidStylez = "line-through text-slate-500 decoration-red-500";
  let beforeToday = day < today ? invalidStylez : "";
  let afterEnd = day > end ? invalidStylez : "";
  return (
    <div
      className={`${stylez} ${selStylez} ${beforeToday} ${afterEnd}`}
      role="button"
      onClick={selectDayClick}
    >
      {day.getDate()}
    </div>
  );
};

// ------------------------------------------------------------------------

const Month = ({ month, className, selectedDay, selectDay }) => {
  const intYr = month.yr;
  const intMon = month.mon < 10 ? `0${month.mon}` : month.mon;
  const day = parseISO(`${intYr}-${intMon}-15`);
  const start = startOfMonth(day);
  const end = endOfMonth(day);

  const allDays = eachDayOfInterval({
    start: start,
    end: end,
  });

  return (
    <div className={className}>
      <div className="flex">
        <h1 className="self-center text-xl mx-auto">
          {day.toLocaleString("default", { month: "long", year: "numeric" })}
        </h1>
      </div>

      <div className="grid grid-cols-7 pt-3 mx-4">
        <div className="place-self-center w-8 h-8">S</div>
        <div className="place-self-center w-8 h-8">M</div>
        <div className="place-self-center w-8 h-8">T</div>
        <div className="place-self-center w-8 h-8">W</div>
        <div className="place-self-center w-8 h-8">T</div>
        <div className="place-self-center w-8 h-8">F</div>
        <div className="place-self-center w-8 h-8">S</div>
      </div>
      <div className="grid gap-3 grid-cols-7 pt-3 mx-4">
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

// ------------------------------------------------------------------------

export const Calendar = ({ setSelectedDay, selectedDay, filldates }) => {
  const today = toDate(new Date(2021, 3, 1));
  let month = 4;
  let year = 2021;
  const [selectedMonth, setSelectedMonth] = useState({ mon: month, yr: year });
  const [smStyleState, setSmS] = useState("w-96");
  const [nextMonth, setNextMonth] = useState({
    mon: month === 8 ? 8 : month + 1,
    yr: 2021,
  });
  const [nmStyleState, setNmS] = useState("opacity-0 w-96 invisible");

  const [lastMonth, setLastMonth] = useState({
    mon: month === 1 ? 12 : month - 1,
    yr: month === 1 ? year - 1 : year,
  });
  const [lmStyleState, setLmS] = useState("opacity-0 w-96 invisible");

  const lmStyles = "opacity-0 w-96 invisible";
  const lmTransitionR =
    "opacity-100 w-96 transition duration-300 translate-x-full";

  const smStyles = "opacity-100 w-96 ";
  const smTransitionL =
    "opacity-0 w-96 transition duration-300 -translate-x-full  ";
  const smTransitionR = " transition w-96 duration-300 translate-x-full";

  //const nmStyles = "opacity-100 w-96";
  //const nmTransitionL = " transition w-96 duration-300 -translate-x-full ";
  //const nmTransitionR = "transition w-96 duration-300 opacity-0 translate-x-full";

  const nmStyles = "opacity-0 w-96 invisible";
  const nmTransitionL =
    "opacity-100 w-96 transition duration-300 -translate-x-full";

  const selectDay = (date) => {
    setSelectedDay(date);
  };

  const updateMonth = (direction) => {
    switch (direction) {
      case "+":
        if (nextMonth.mon > 8) {
          break;
        } else {
          //move calendars
          setSmS(smTransitionL);
          setNmS(nmTransitionL);

          setTimeout(() => {
            //set new data
            setLastMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon + 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: nextMonth.mon + 1, yr: nextMonth.yr });

            //revert styles
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);
        }

        break;
      case "-":
        if (lastMonth.mon < 4) {
          break;
        } else {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: lastMonth.mon - 1, yr: selectedMonth.yr });
            setNextMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });

            setSelectedMonth({
              mon: selectedMonth.mon - 1,
              yr: selectedMonth.yr,
            });
            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);
        }
        break;
      default:
        console.log("please enter + or - to change the month");
        break;
    }
  };

  return (
    <div className="relative overflow-x-hidden w-1200 z-0">
      <div className="justify-center mx-auto">
        <button className="mx-5 self-center" onClick={() => updateMonth("-")}>
          -
        </button>
        <button className="mx-5 self-center" onClick={() => updateMonth("+")}>
          +
        </button>
      </div>
      <div className="inline-flex overflow-x-hidden w-full self-center">
        <Month
          month={lastMonth}
          className={lmStyleState}
          selectedDay={selectedDay}
          selectDay={selectDay}
        />
        <Month
          month={selectedMonth}
          className={smStyleState}
          selectedDay={selectedDay}
          selectDay={selectDay}
        />
        <Month
          month={nextMonth}
          className={nmStyleState}
          selectedDay={selectedDay}
          selectDay={selectDay}
        />
      </div>
    </div>
  );
};
