import { Link } from "react-router-dom";
import img from "../images/micheile-dot-com-GrdAN0NEIKY-unsplash.jpg";

const LandingHero = () => (
  <div className="relative">
    <div className="">
      <img
        src={img}
        alt="cyclist"
        className="
        h-400 w-full object-cover saturate-75 contrast-75
        md:h-600 md:w-full md:object-cover md:saturate-75 md:contrast-75
        
        "
      />
    </div>

    <div
      className="
    absolute top-[40%] left-[45%] right-[5%] font-serif text-white text-4xl
    md:top-[45%] md:left-1/2 md:right-1/8 md:text-5xl
    "
    >
      <div>City Bike App</div>
    </div>
  </div>
);

const Amenity = ({ title, desc, className, img, linkLoc }) => (
  <div className={className + " place-content-center flex flex-col"}>
    <Link
      to={linkLoc}
      className={
        "w-auto h-full mr-4 mb-4 place-content-center bg-cover flex flex-col z-0 contrast-50 " +
        img
      }
    />
    <div className=" opacity-100 z-10 blur-none absolute self-center text-white">
      <div className="text-3xl ">{title}</div>
      <div>{desc}</div>
    </div>
  </div>
);

const Amenities = () => (
  <div className="block w-full h-auto pt-4 pl-4 pb-4 relative ">
    <Amenity
      className="
      h-[340px] 
      md:w-3/5 md:float-left md:relative
      "
      title="Data Overview"
      desc="Key data points"
      linkLoc="/data"
      img="bg-data "
    />
    <Amenity
      className="
      h-[360px] 
      md:w-2/5 md:float-right md:relative
      "
      title="Journeys"
      desc="Every journey at your fingertips"
      linkLoc="/trips"
      img="bg-trips bg-cover text-white bg-center"
    />
    <Amenity
      className="
      h-[300px] 
      md:w-3/5 md:float-left md:relative
      "
      title="Stations"
      desc="Explore the data by station"
      linkLoc="/stations"
      img="bg-stations bg-cover bg-[center_left_29rem] text-white "
    />
    <Amenity
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

export const Landing = () => {
  return (
    <div className="">
      <LandingHero />
      <Amenities />
    </div>
  );
};
