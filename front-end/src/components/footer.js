import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="flex w-full h-400 items-center content-between justify-between mx-auto overflow-hidden bg-stone-200 ">
      <div className=" flex flex-col w-1/4 mx-auto h-full mt-[170px]">
        <div className="self-center flex flex-col h-full">
          <span className="text-2xl pb-5">Quick Menu </span>
          <Link to="/">Home</Link>
          <Link to="/data">Data Overview</Link>
          <Link to="/trips">Journeys</Link>
          <Link to="/stations">Stations</Link>
          <Link to="/upload">Upload</Link>
        </div>
      </div>
    </div>
  );
};
