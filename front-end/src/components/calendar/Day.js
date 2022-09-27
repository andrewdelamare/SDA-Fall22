import startOfDay from "date-fns/startOfDay";
export const Day = ({ selectDay, day, selectedDay }) => {
  const today = new Date(2021, 4, 1);
  const end = new Date(2021, 6, 31);
  const dayOfWeek = day.getDay();
  let sel = startOfDay(day).getTime() === selectedDay.getTime() ? true : false;
  const dayBase =
    "w-8 h-8 place-self-center justify-around place-items-center flex";
  const styleArr = [
    "col-start-1 col-end-1",
    "col-start-2 col-end-2",
    "col-start-3 col-end-3",
    "col-start-4 col-end-4",
    "col-start-5 col-end-5",
    "col-start-6 col-end-6",
    "col-start-7 col-end-7",
  ];
  const stylez = `${styleArr[dayOfWeek]} ${dayBase}`;
  const selectDayClick = () => {
    day < today
      ? console.log("no data for this day, please select another")
      : day > end
      ? console.log("no data for this day, please select another")
      : selectDay(day);
  };
  const selected = "bg-blue-400 text-white rounded-full";
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
