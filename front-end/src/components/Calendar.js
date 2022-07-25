import {
  getMonth,
  eachDayOfInterval,
  getYear,
  startOfMonth,
  endOfMonth,
  parseISO,
  endOfDay,
  startOfDay,
} from "date-fns";
import { startOfToday } from "date-fns";
import { useEffect, useState } from "react";

// ------------------------------------------------------------------------

const Date = ({
  selectDay,
  day,
  selectedDayStart,
  selectedDayEnd,
  reserved,
}) => {
  const [ciRes, setCiRes] = useState("");
  const [coRes, setCoRes] = useState("");

  const today = startOfToday();
  const dayOfWeek = day.getDay();
  let selStart =
    endOfDay(day).getTime() === selectedDayStart.getTime() ? true : false;
  let selEnd = false;
  if (selectedDayEnd !== null) {
    if (startOfDay(day).getTime() === selectedDayEnd.getTime()) {
      selEnd = true;
    }
  }

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
    selectDay(day);
  };
  const selected = "bg-black text-white rounded-full";
  let selStylez =
    selStart !== false ? selected : selEnd !== false ? selected : "";

  const invalidStylez = "line-through text-slate-500 decoration-red-500";
  let beforeToday = day < today ? invalidStylez : "";
  let beforeSelStart =
    endOfDay(day) < selectedDayStart && selectedDayEnd === null
      ? invalidStylez
      : "";

  const end = endOfDay(day);
  const start = startOfDay(day);
  const reset = () => {
    setCiRes("");
    setCoRes("");
  };

  useEffect(() => {
    if (reserved[0] !== null) {
      let cIreserved = reserved.find((d) => d.getTime() === end.getTime());
      let cOreserved = reserved.find((d) => d.getTime() === start.getTime());
      selectedDayStart !== null &&
      selectedDayEnd !== null &&
      selectedDayEnd.getTime() === start.getTime()
        ? setCiRes("")
        : cOreserved !== undefined && selectedDayEnd === null
        ? setCoRes(invalidStylez)
        : cIreserved !== undefined && selectedDayEnd != null
        ? setCiRes(invalidStylez)
        : reset();
    }
  });

  return (
    <div
      className={`${stylez} ${selStylez} ${beforeToday} ${beforeSelStart} ${ciRes} ${coRes} `}
      role="button"
      onClick={selectDayClick}
    >
      {day.getDate()}
    </div>
  );
};

// ------------------------------------------------------------------------

const Month = ({
  month,
  className,
  selectedDayStart,
  selectedDayEnd,
  selectDay,
  reserved,
}) => {
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
          <Date
            day={day}
            key={day}
            selectDay={selectDay}
            selectedDayStart={selectedDayStart}
            selectedDayEnd={selectedDayEnd}
            reserved={reserved}
          />
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------

export const Calendar = ({
  setSelectedDayStart,
  setSelectedDayEnd,
  selectedDayStart,
  selectedDayEnd,
  reserved,
  filldates,
}) => {
  const today = startOfToday();
  let month = getMonth(today) + 1;
  let year = getYear(today);
  const [selectedMonth, setSelectedMonth] = useState({ mon: month, yr: year });
  const [smStyleState, setSmS] = useState("w-96");
  const [nextMonth, setNextMonth] = useState({
    mon: month === 12 ? 1 : month + 1,
    yr: month === 12 ? year + 1 : year,
  });
  const [nmStyleState, setNmS] = useState("w-96");
  const [nextNextMonth, setNextNextMonth] = useState({
    mon: month === 12 ? 2 : month === 11 ? 1 : month + 2,
    yr: month === 12 ? year + 1 : month === 11 ? year + 1 : year,
  });
  const [nnmStyleState, setNnMs] = useState("opacity-0 w-96 invisible");
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

  const nmStyles = "opacity-100 w-96";
  const nmTransitionL = " transition w-96 duration-300 -translate-x-full ";
  const nmTransitionR =
    "transition w-96 duration-300 opacity-0 translate-x-full";

  const nNmStyles = "opacity-0 w-96 invisible";
  const nNmTransitionL =
    "opacity-100 w-96 transition duration-300 -translate-x-full";

  const determineRes = (day, inOut) => {
    const end = endOfDay(day);
    const start = startOfDay(day);
    let cIreserved = reserved.find((d) => d.getTime() === end.getTime());
    let cOreserved = reserved.find((d) => d.getTime() === start.getTime());

    return inOut === "in" && cIreserved === undefined
      ? false
      : inOut === "in" && cIreserved !== undefined
      ? true
      : inOut === "out" && cOreserved === undefined
      ? false
      : inOut === "out" && cOreserved !== undefined
      ? true
      : false;
  };

  const detInclRes = (end) => {
    const gtRes = reserved.map((date) => date.getTime());
    const filled = filldates(selectedDayStart, end);
    const fillmap = filled.map((date) => date.getTime());
    const resArr = gtRes.map((date) => fillmap.includes(date));
    return resArr.includes(true) ? true : false;
  };

  const selectDay = (date) => {
    switch (true) {
      case date < today:
        console.log("Please select a day starting from today");
        break;
      case date > selectedDayStart && selectedDayEnd !== null:
        if (determineRes(date, "in") === false) {
          setSelectedDayStart(endOfDay(date));
          setSelectedDayEnd(null);
        } else {
          window.alert(
            "Check in for this day is already reserved. Please choose another date for your stay."
          );
        }
        break;
      case date < selectedDayStart && selectedDayEnd !== null:
        if (determineRes(date, "in") === false) {
          setSelectedDayStart(endOfDay(date));
          setSelectedDayEnd(null);
        } else {
          window.alert(
            "Check in for this day is already reserved. Please choose another date for your stay."
          );
        }
        break;
      case date > selectedDayStart && selectedDayEnd === null:
        if (determineRes(date, "out") === false && detInclRes(date) === false) {
          setSelectedDayEnd(startOfDay(date));
        } else {
          window.alert(
            "The dates you selected are not available. Please choose another check out date."
          );
        }

        break;
      default:
        console.log("Please choose a checkout day");
    }
  };

  const updateMonth = (direction) => {
    switch (direction) {
      case "+":
        if (selectedMonth.mon === 11) {
          //move calendars
          setSmS(smTransitionL);
          setNmS(nmTransitionL);
          setNnMs(nNmTransitionL);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon + 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: 1, yr: nextMonth.yr + 1 });
            setNextNextMonth({
              mon: nextNextMonth.mon + 1,
              yr: nextNextMonth.yr,
            });
            //revert styles
            setSmS(smStyles);
            setNmS(nmStyles);
            setNnMs(nNmStyles);
          }, 300);

          break;
        } else if (selectedMonth.mon === 12) {
          //move calendars
          setSmS(smTransitionL);
          setNmS(nmTransitionL);
          setNnMs(nNmTransitionL);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setSelectedMonth({ mon: 1, yr: selectedMonth.yr + 1 });
            setNextMonth({ mon: 2, yr: nextMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon + 1,
              yr: nextNextMonth.yr,
            });
            //revert styles
            setSmS(smStyles);
            setNmS(nmStyles);
            setNnMs(nNmStyles);
          }, 300);

          break;
        } else if (selectedMonth.mon === 10) {
          //move calendars
          setSmS(smTransitionL);
          setNmS(nmTransitionL);
          setNnMs(nNmTransitionL);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon + 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: nextMonth.mon + 1, yr: nextMonth.yr });
            setNextNextMonth({ mon: 1, yr: nextNextMonth.yr + 1 });
            //revert styles
            setSmS(smStyles);
            setNmS(nmStyles);
            setNnMs(nNmStyles);
          }, 300);

          break;
        } else {
          //move calendars
          setSmS(smTransitionL);
          setNmS(nmTransitionL);
          setNnMs(nNmTransitionL);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon + 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: nextMonth.mon + 1, yr: nextMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon + 1,
              yr: nextNextMonth.yr,
            });
            //revert styles
            setSmS(smStyles);
            setNmS(nmStyles);
            setNnMs(nNmStyles);
          }, 300);

          break;
        }
      case "-":
        if (selectedMonth.mon === 1) {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setNmS(nmTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: lastMonth.mon - 1, yr: selectedMonth.yr });
            setNextMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon - 1,
              yr: nextNextMonth.yr,
            });
            setSelectedMonth({ mon: 12, yr: selectedMonth.yr - 1 });
            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);

          break;
        } else if (selectedMonth.mon === 2) {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setNmS(nmTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: 12, yr: lastMonth.yr - 1 });
            setNextMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon - 1,
              yr: nextNextMonth.yr,
            });
            setSelectedMonth({
              mon: selectedMonth.mon - 1,
              yr: selectedMonth.yr,
            });
            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);

          break;
        } else if (selectedMonth.mon === 12) {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setNmS(nmTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: lastMonth.mon - 1, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon - 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: 12, yr: nextMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon - 1,
              yr: nextNextMonth.yr,
            });

            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);

          break;
        } else if (selectedMonth.mon === 11) {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setNmS(nmTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: lastMonth.mon - 1, yr: selectedMonth.yr });
            setSelectedMonth({
              mon: selectedMonth.mon - 1,
              yr: selectedMonth.yr,
            });
            setNextMonth({ mon: nextMonth.mon - 1, yr: nextMonth.yr });
            setNextNextMonth({ mon: 12, yr: nextNextMonth.yr - 1 });

            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);

          break;
        } else {
          //move calendars
          setLmS(lmTransitionR);
          setSmS(smTransitionR);
          setNmS(nmTransitionR);
          setTimeout(() => {
            //set new data
            setLastMonth({ mon: lastMonth.mon - 1, yr: selectedMonth.yr });
            setNextMonth({ mon: selectedMonth.mon, yr: selectedMonth.yr });
            setNextNextMonth({
              mon: nextNextMonth.mon - 1,
              yr: nextNextMonth.yr,
            });
            setSelectedMonth({
              mon: selectedMonth.mon - 1,
              yr: selectedMonth.yr,
            });
            //revert styles
            setLmS(lmStyles);
            setSmS(smStyles);
            setNmS(nmStyles);
          }, 300);

          break;
        }
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
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          selectDay={selectDay}
          reserved={reserved}
        />
        <Month
          month={selectedMonth}
          className={smStyleState}
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          selectDay={selectDay}
          reserved={reserved}
        />
        <Month
          month={nextMonth}
          className={nmStyleState}
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          selectDay={selectDay}
          reserved={reserved}
        />
        <Month
          month={nextNextMonth}
          className={nnmStyleState}
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          selectDay={selectDay}
          reserved={reserved}
        />
      </div>
    </div>
  );
};
