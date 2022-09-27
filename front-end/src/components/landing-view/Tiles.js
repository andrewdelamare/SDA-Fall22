import { Tile } from "./Tile";
export const Tiles = () => (
  <div className="block w-full h-auto pt-4 pl-4 pb-4 relative ">
    <Tile
      className="
      h-[340px] 
      md:w-3/5 md:float-left md:relative
      "
      title="Data Overview"
      desc="Key data points"
      linkLoc="/data"
      img="bg-data "
    />
    <Tile
      className="
      h-[360px] 
      md:w-2/5 md:float-right md:relative
      "
      title="Journeys"
      desc="Every journey at your fingertips"
      linkLoc="/trips"
      img="bg-trips bg-cover text-white bg-center"
    />
    <Tile
      className="
      h-[300px] 
      md:w-3/5 md:float-left md:relative
      "
      title="Stations"
      desc="Explore the data by station"
      linkLoc="/stations"
      img="bg-stations bg-cover bg-[center_left_29rem] text-white "
    />
    <Tile
      className="
      h-[280px] 
      md:w-2/5 md:float-right md:relative
      "
      title="Upload"
      desc="Add a new journey or station"
      linkLoc="/upload"
      img="bg-upload bg-cover bg-center text-white "
    />
  </div>
);
