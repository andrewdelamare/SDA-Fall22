import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTotalCounts,
  getStation,
  getAllPopular,
  getTotalAverages,
  getMonthCounts,
  getMonthAverages,
  getMonthPopular,
} from "../../services/stationService";
import { Map } from "../Map";
import { Spinner } from "../Spinner";
import { DataView } from "./DataView";

export const StationView = () => {
  const { id } = useParams();
  const [avs, setAvs] = useState(null);
  const [counts, setCounts] = useState(null);
  const [popular, setPopular] = useState(null);
  const [station, setStation] = useState({ name: "..." });
  const [fired, setFired] = useState(false);
  const [month, setMonth] = useState("all");
  const [selectStyles, setSelStyles] = useState(
    "mt-3 hover:cursor-wait pointer-events-none"
  );
  const [bStyle, setBStyle] = useState(
    "hover:cursor-wait border-2 px-2 rounded-xl text-sm hover:bg-stone-200"
  );

  const resetOnNavigate = () => {
    setAvs(null);
    setCounts(null);
    setPopular(null);
    setStation({ name: "..." });
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
      setSelStyles("mt-3 hover:cursor-wait pointer-events-none");
      setBStyle(
        "hover:cursor-wait border-2 px-2 rounded-xl text-sm hover:bg-stone-200"
      );
      switch (month) {
        case "all":
          const allCount = await getTotalCounts(id);
          setCounts(allCount);
          const allAvs = await getTotalAverages(id);
          setAvs(allAvs);
          const allPop = await getAllPopular(id);
          setPopular(allPop);
          break;

        case "may":
          const mCounts = await getMonthCounts(id, 4);
          setCounts(mCounts);
          const mAvs = await getMonthAverages(id, 4);
          setAvs(mAvs);
          const mPop = await getMonthPopular(id, 4);
          setPopular(mPop);
          break;

        case "june":
          const junCounts = await getMonthCounts(id, 5);
          setCounts(junCounts);
          const junAvs = await getMonthAverages(id, 5);
          setAvs(junAvs);
          const junPop = await getMonthPopular(id, 5);
          setPopular(junPop);
          break;

        case "july":
          const julCounts = await getMonthCounts(id, 6);
          setCounts(julCounts);
          const julAvs = await getMonthAverages(id, 6);
          setAvs(julAvs);
          const julPop = await getMonthPopular(id, 6);
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
    if (avs !== null && counts !== null && popular !== null) {
      setBStyle("border-2 px-2 rounded-xl text-sm hover:bg-stone-200");
      setSelStyles("mt-3 ");
    }
  }, [id, fired, avs, counts, popular]);
  return (
    <div className="mx-10 my-4 flex flex-col">
      <div className="">
        <div
          className="
        flex flex-col justify-between items-center first-letter
        md:flex-row md:justify-around
        "
        >
          {station.name === "..." ? (
            <Spinner />
          ) : (
            <h2 className="text-3xl underline font-bold md:mr-10">
              {station.name}
            </h2>
          )}
          <form className="mt-3">
            <label className="mr-2">Filter by month:</label>
            <select
              onChange={(e) => setMonth(e.target.value)}
              className={`${selectStyles} mr-3 rounded`}
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
        <DataView
          avs={avs}
          counts={counts}
          popular={popular}
          reset={resetOnNavigate}
        />
        {station.name === "..." ? (
          <Spinner />
        ) : (
          <Map features={[station]} zoom={11.5} />
        )}
      </div>
    </div>
  );
};