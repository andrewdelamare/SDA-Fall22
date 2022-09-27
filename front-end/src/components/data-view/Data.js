import { StationLinkButton } from "./StationLinkButton";
import { Spinner } from "../Spinner";

export const Data = ({ counts, avs, popular, reset }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center border-2 rounded shadow-md border-slate-800 w-[300px] m-2 p-2 ">
          <h3>Total Journeys: </h3>
          <div>{counts === null ? <Spinner /> : counts.journeys}</div>
        </div>
        <div className="flex flex-col items-center border-2 rounded shadow-md border-slate-800 w-[300px] m-2 p-2 ">
          <h3>Average distance:</h3>
          <div>
            {avs === null ? <Spinner /> : ` ${Math.floor(avs.avDis) / 1000} km`}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center border-2 rounded shadow-md border-slate-800 w-[300px] m-2 p-2 ">
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
        <div className="flex flex-col items-center border-2 rounded shadow-md border-slate-800 w-[300px] m-2 p-2 ">
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