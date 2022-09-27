import { Hour } from "./Hour";
export const HourSelector = ({ selectedHour, setHour }) => {
  const arr = [
    0, 12, 1, 13, 2, 14, 3, 15, 4, 16, 5, 17, 6, 18, 7, 19, 8, 20, 9, 21, 10,
    22, 11, 23,
  ];
  return (
    <div
      className="
    md:absolute md:left-[70%] lg:left-[60%]
    "
    >
      <div className="text-md md:text-lg w-full text-center">
        Departure Hour
      </div>
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
