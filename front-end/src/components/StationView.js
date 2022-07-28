import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartures, getStation } from "../services/stationService";

export const StationView = () => {
  const { id } = useParams();
  const [departures, setDepartures] = useState(0);
  const [station, setStation] = useState({ name: "..." });
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      const res = await getDepartures(id);
      console.log(res);
      setDepartures(res[0].departures);
    };
    const getSt = async () => {
      const res = await getStation(id);
      console.log(res);
      setStation(res);
    };
    getData();
    getSt();
  }, [id]);
  return (
    <div className="mx-10 my-4 mt-[96px] flex flex-col">
      <h2>{station.name}</h2>
      <div className="">departures: {departures} </div>
    </div>
  );
};
