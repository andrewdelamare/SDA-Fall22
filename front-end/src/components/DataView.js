import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDVCounts,
  getDVPopular,
  getDVAverages,
  dvMonthCounts,
  dvMonthAverages,
  dvMonthPopular,
  getStation,
} from "../services/stationService";
import { Map } from "./Map";
import { Spinner } from "./Spinner";

const StationLinkButton = ({ name, id, reset }) => {
  const stringId = id < 10 ? `00${id}` : id < 100 ? `0${id}` : id;

  return (
    <Link
      className="inline-block bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
      to={`/stations/${stringId}`}
      onClick={() => reset()}
    >
      {name}
    </Link>
  );
};

const Data = ({ counts, avs, popular, reset }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center border-2 border-black w-[300px] m-2 p-2 ">
          <h3>Total Journeys: </h3>
          <div>{counts === null ? <Spinner /> : counts.journeys}</div>
        </div>
        <div className="flex flex-col items-center border-2 border-black w-[300px] m-2 p-2 ">
          <h3>Average distance:</h3>
          <div>
            {avs === null ? <Spinner /> : ` ${Math.floor(avs.avDis) / 1000} km`}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center border-2 border-black w-[300px] m-2 p-2 ">
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
        <div className="flex flex-col items-center border-2 border-black w-[300px] m-2 p-2 ">
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

export const DataView = () => {
  const { id } = useParams();
  const [avs, setAvs] = useState(null);
  const [counts, setCounts] = useState(null);
  const [popular, setPopular] = useState(null);
  const [fired, setFired] = useState(false);
  const [month, setMonth] = useState("all");
  const [selectStyles, setSelStyles] = useState(
    "mt-3 hover:cursor-wait pointer-events-none"
  );
  const [bStyle, setBStyle] = useState(
    "hover:cursor-wait border-2 px-2 rounded-xl text-sm hover:bg-stone-200"
  );
  const [popStations, setPopStations] = useState(null);
  const [mapLoad, setMl] = useState(false);

  const resetOnNavigate = () => {
    setAvs(null);
    setCounts(null);
    setPopular(null);
    setFired(false);
  };

  const submitAction = async (e) => {
    if ((avs === null) | (counts === null) | (popular === null)) {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      setAvs(null);
      setCounts(null);
      setPopular(null);
      setPopStations(null);
      setMl(false);
      setSelStyles("mt-3 hover:cursor-wait pointer-events-none");
      setBStyle(
        "hover:cursor-wait border-2 px-2 rounded-xl text-sm hover:bg-stone-200"
      );
      switch (month) {
        case "all":
          const allCount = await getDVCounts();
          setCounts(allCount);
          const allAvs = await getDVAverages();
          setAvs(allAvs);
          const allPop = await getDVPopular();
          setPopular(allPop);
          break;

        case "may":
          const mCounts = await dvMonthCounts(4);
          setCounts(mCounts);
          const mAvs = await dvMonthAverages(4);
          setAvs(mAvs);
          const mPop = await dvMonthPopular(4);
          setPopular(mPop);
          break;

        case "june":
          const junCounts = await dvMonthCounts(5);
          setCounts(junCounts);
          const junAvs = await dvMonthAverages(5);
          setAvs(junAvs);
          const junPop = await dvMonthPopular(5);
          setPopular(junPop);
          break;

        case "july":
          const julCounts = await dvMonthCounts(6);
          setCounts(julCounts);
          const julAvs = await dvMonthAverages(6);
          setAvs(julAvs);
          const julPop = await dvMonthPopular(6);
          setPopular(julPop);
          break;
        default:
          break;
      }
      setBStyle("border-2 px-2 rounded-xl text-sm hover:bg-stone-200");
      setSelStyles("mt-3 ");
    }
  };

  useEffect(() => {
    const getAvs = async () => {
      const res = await getDVAverages();
      setAvs(res);
    };
    const getPop = async () => {
      const res = await getDVPopular();
      setPopular(res);
    };
    const getCounts = async () => {
      const res = await getDVCounts(id);
      setCounts(res);
    };
    if (fired === false) {
      getAvs();
      getCounts();
      getPop();
      setFired(true);
    }
    if (
      avs !== null &&
      counts !== null &&
      popular !== null &&
      popStations !== null
    ) {
      setBStyle("border-2 px-2 rounded-xl text-sm hover:bg-stone-200");
      setSelStyles("mt-3 ");
    }
    if (mapLoad === false && popular !== null) {
      const loadPopInfo = async () => {
        let arr = [];
        for (const stat of Object.values(popular.popDepartures).slice(1)) {
          const stringId =
            stat.stId < 10
              ? `00${stat.stId}`
              : stat.stId < 100
              ? `0${stat.stId}`
              : stat.stId;
          const s = await getStation(stringId);
          arr.push(s);
        }
        for (const stat of Object.values(popular.popReturns).slice(1)) {
          const stringId =
            stat.stId < 10
              ? `00${stat.stId}`
              : stat.stId < 100
              ? `0${stat.stId}`
              : stat.stId;
          const s = await getStation(stringId);
          arr.push(s);
        }
        setPopStations(arr);
      };
      loadPopInfo();
      setMl(true);
    }
  }, [id, fired, avs, counts, popular, mapLoad, popStations]);
  return (
    <div className="mx-10 my-4 flex flex-col">
      <div className="">
        <div
          className="
        flex flex-col justify-between items-center first-letter
        md:flex-row md:justify-around
        "
        >
          <h2 className="text-3xl underline font-bold md:mr-10 ">
            Data Overview
          </h2>
          <form className="content-center items-center my-2">
            <label className="mr-2">Filter by month:</label>
            <select
              onChange={(e) => setMonth(e.target.value)}
              className={`${selectStyles} mr-3`}
            >
              <option value={"all"}>All Months</option>
              <option value={"may"}>May</option>
              <option value={"june"}>June</option>
              <option value={"july"}>July</option>
            </select>
            <button
              className={bStyle}
              type="submit"
              onClick={(e) => submitAction(e)}
            >
              Apply Filter
            </button>
          </form>
        </div>
        <Data
          avs={avs}
          counts={counts}
          popular={popular}
          reset={resetOnNavigate}
        />
        {popStations === null ? (
          <Spinner />
        ) : (
          <Map features={popStations} zoom={10.5} />
        )}
      </div>
    </div>
  );
};
