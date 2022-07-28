import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTotalCounts,
  getStation,
  getAllPopular,
  getTotalAverages,
} from "../services/stationService";

const Spinner = () => {
  return (
    <div className="flex">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

const DataView = ({ counts, avs, popular }) => {
  return (
    <div>
      <h3>
        Total departures: {counts === null ? <Spinner /> : counts.depCount}
      </h3>
      <h3>Total returns: {counts === null ? <Spinner /> : counts.retCount}</h3>
      <h3>
        Average distance if starting from this station:{" "}
        {avs === null ? <Spinner /> : avs.avDistSt}
      </h3>
      <h3>
        Average distance if returned to this station:{" "}
        {avs === null ? <Spinner /> : avs.avDistRet}{" "}
      </h3>
      <h3>Popular return stations:</h3>
      <ol className="list-decimal">
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popReturns.first.stNm} : ${popular.popReturns.first.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popReturns.second.stNm} : ${popular.popReturns.second.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popReturns.third.stNm} : ${popular.popReturns.third.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popReturns.fourth.stNm} : ${popular.popReturns.fourth.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popReturns.fifth.stNm} : ${popular.popReturns.fifth.count}`
          )}
        </li>
      </ol>
      <h3>Popular departure stations:</h3>
      <ol className="list-decimal">
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popDepartures.first.stNm} : popular.popDepartures.first.count`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popDepartures.second.stNm} : ${popular.popDepartures.second.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popDepartures.third.stNm} : ${popular.popDepartures.third.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popDepartures.fourth.stNm} : ${popular.popDepartures.fourth.count}`
          )}
        </li>
        <li>
          {popular === null ? (
            <Spinner />
          ) : (
            `${popular.popDepartures.fifth.stNm} : ${popular.popDepartures.fifth.count}`
          )}
        </li>
      </ol>
    </div>
  );
};

export const StationView = () => {
  const { id } = useParams();
  const [avs, setAvs] = useState(null);
  const [counts, setCounts] = useState(null);
  const [popular, setPopular] = useState(null);
  const [station, setStation] = useState({ name: "..." });
  console.log(id);

  useEffect(() => {
    const getAvs = async () => {
      const res = await getTotalAverages(id);
      console.log(res);
      setAvs(res);
    };
    const getSt = async () => {
      const res = await getStation(id);
      console.log(res);
      setStation(res);
    };
    const getPop = async () => {
      const res = await getAllPopular(id);
      console.log(res);
      setPopular(res);
    };
    const getCounts = async () => {
      const res = await getTotalCounts(id);
      console.log(res);
      setCounts(res);
    };
    getPop();
    getAvs();
    getCounts();
    getSt();
  }, [id]);
  return (
    <div className="mx-10 my-4 mt-[96px] flex flex-col">
      {station.name === "..." ? <Spinner /> : <h2>{station.name}</h2>}
      <DataView avs={avs} counts={counts} popular={popular} />
    </div>
  );
};
