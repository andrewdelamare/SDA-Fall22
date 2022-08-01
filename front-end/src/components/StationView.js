import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTotalCounts,
  getStation,
  getAllPopular,
  getTotalAverages,
} from "../services/stationService";
import { Map } from "./Map";
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
          strokeWidth="4"
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

const StationLinkButton = ({ name, id, reset }) => {
  const navigate = useNavigate();
  const goToStation = (id) => {
    reset();
    navigate(`/stations/${id}`);
  };

  return (
    <button
      type="button"
      className="inline-block bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
      onClick={() => goToStation(id)}
    >
      {name}
    </button>
  );
};

const DataView = ({ counts, avs, popular, reset }) => {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Total departures: </h3>
          <div>{counts === null ? <Spinner /> : counts.depCount}</div>
        </div>
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Total returns: </h3>
          <div>{counts === null ? <Spinner /> : counts.retCount}</div>
        </div>
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Average distance if starting from this station:</h3>
          <div>
            {avs === null ? (
              <Spinner />
            ) : (
              ` ${Math.floor(avs.avDistSt) / 1000} km`
            )}
          </div>
        </div>
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Average distance if returned to this station:</h3>
          <div>
            {avs === null ? (
              <Spinner />
            ) : (
              ` ${Math.floor(avs.avDistRet) / 1000} km`
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Popular return stations:</h3>
          <div>
            <ol className="list-decimal list-inside">
              {popular === null ? (
                <Spinner />
              ) : (
                <div>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popReturns.first.stNm}
                      id={popular.popReturns.first.stId}
                    />{" "}
                    : {popular.popReturns.first.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popReturns.second.stNm}
                      id={popular.popReturns.second.stId}
                    />{" "}
                    : {popular.popReturns.second.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popReturns.third.stNm}
                      id={popular.popReturns.third.stId}
                    />{" "}
                    : {popular.popReturns.third.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popReturns.fourth.stNm}
                      id={popular.popReturns.fourth.stId}
                    />{" "}
                    : {popular.popReturns.fourth.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popReturns.fifth.stNm}
                      id={popular.popReturns.fifth.stId}
                    />{" "}
                    : {popular.popReturns.fifth.count}
                  </li>
                </div>
              )}
            </ol>
          </div>
        </div>
        <div className="flex flex-col items-center border-2 border-black w-auto m-2 p-2 ">
          <h3>Popular departure stations:</h3>
          <div>
            <ol className="list-decimal list-inside">
              {popular === null ? (
                <Spinner />
              ) : (
                <div>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popDepartures.first.stNm}
                      id={popular.popDepartures.first.stId}
                    />{" "}
                    : {popular.popDepartures.first.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popDepartures.second.stNm}
                      id={popular.popDepartures.second.stId}
                    />{" "}
                    : {popular.popDepartures.second.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popDepartures.third.stNm}
                      id={popular.popDepartures.third.stId}
                    />{" "}
                    : {popular.popDepartures.third.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popDepartures.fourth.stNm}
                      id={popular.popDepartures.fourth.stId}
                    />{" "}
                    : {popular.popDepartures.fourth.count}
                  </li>
                  <li>
                    <StationLinkButton
                      reset={reset}
                      name={popular.popDepartures.fifth.stNm}
                      id={popular.popDepartures.fifth.stId}
                    />{" "}
                    : {popular.popDepartures.fifth.count}
                  </li>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StationView = () => {
  const { id } = useParams();
  const [avs, setAvs] = useState(null);
  const [counts, setCounts] = useState(null);
  const [popular, setPopular] = useState(null);
  const [station, setStation] = useState({ name: "..." });
  const [fired, setFired] = useState(false);

  const resetOnNavigate = () => {
    setAvs(null);
    setCounts(null);
    setPopular(null);
    setStation({ name: "..." });
    setFired(false);
  };

  useEffect(() => {
    const getAvs = async () => {
      const res = await getTotalAverages(id);
      if (res) setAvs(res);
    };
    const getSt = async () => {
      const res = await getStation(id);
      setStation(res);
    };
    const getPop = async () => {
      const res = await getAllPopular(id);
      setPopular(res);
    };
    const getCounts = async () => {
      const res = await getTotalCounts(id);
      setCounts(res);
    };
    if (fired === false) {
      getSt();
      getAvs();
      getCounts();
      getPop();
      setFired(true);
    }
  }, [id, fired]);
  return (
    <div className="mx-10 my-4 mt-[96px] flex flex-col">
      <div className="">
        {station.name === "..." ? (
          <Spinner />
        ) : (
          <h2 className="text-3xl underline font-bold ">{station.name}</h2>
        )}
        <DataView
          avs={avs}
          counts={counts}
          popular={popular}
          reset={resetOnNavigate}
        />
        {station.name === "..." ? <Spinner /> : <Map features={[station]} />}
      </div>
    </div>
  );
};