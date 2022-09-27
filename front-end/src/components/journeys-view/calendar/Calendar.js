import { Month } from "./Month";
import { useState } from "react";

export const Calendar = ({ setSelectedDay, selectedDay }) => {
  let month = 5;
  let year = 2021;

  const [selectedMonth, setSelectedMonth] = useState({ mon: month, yr: year });
  const [smStyleState, setSmS] = useState("min-w-96");

  const [nextMonth, setNextMonth] = useState({
    mon: month === 7 ? 7 : month + 1,
    yr: 2021,
  });
  const [nmStyleState, setNmS] = useState("opacity-0 invisible");

  const [lastMonth, setLastMonth] = useState({
    mon: month === 1 ? 12 : month - 1,
    yr: month === 1 ? year - 1 : year,
  });
  const [lmStyleState, setLmS] = useState("opacity-0 min-w-96 invisible");

  const lmStyles = "opacity-0 min-w-96 invisible";

  const lmTransitionR =
    "invisible opacity-0 md:visible md:opacity-100 min-w-96 md:transition md:duration-300 md:translate-x-full";

  const smStyles = "opacity-100 min-w-96 z-10";

  const smTransitionL =
    " min-w-96 md:opacity-0 md:transition md:duration-300 md:-translate-x-full";

  const smTransitionR =
    "visible md:transition min-w-96 md:duration-300 md:opacity-0 md:translate-x-full";

  const nmStyles = "opacity-0 invisible ";

  const nmTransitionL =
    "invisible opacity-0 md:visible md:opacity-100 md:min-w-96 md:transition md:duration-300 md:w-2 md:-translate-x-full";

  const selectDay = (date) => {
    setSelectedDay(date);
  };

  const updateMonth = (direction) => {
    switch (direction) {
      case "+":
        if (nextMonth.mon > 7) {
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
        if (lastMonth.mon < 5) {
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
  const lArrow = "<";
  const rArrow = ">";
  return (
    <div className="relative overflow-x-hidden -left-[130px] md:-left-[330px] justify-center items-center">
      <div className="absolute left-[395px] flex z-40">
        <button
          className="md:mr-[143px] md:ml-[0px] mr-[108px] ml-[30px] "
          onClick={() => updateMonth("-")}
        >
          {lArrow}
        </button>
        <button
          className="md:ml-[143px] ml-[120px] "
          onClick={() => updateMonth("+")}
        >
          {rArrow}
        </button>
      </div>
      <div className="inline-flex overflow-x-hidden  ">
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
