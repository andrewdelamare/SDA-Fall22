import { Link } from "react-router-dom";
//import img from "../zero-take-WvHrrR1C5Po-unsplash.jpg";

const LandingHero = () => (
  <div className="relative">
    <div className="">
      <img
        src={img}
        alt="hotel"
        className="h-600 w-full object-cover saturate-150 contrast-75 "
      />
    </div>

    <div className="absolute top-1/2 left-1/4 right-1/4 text-white font-serif">
      <div className="text-6xl">Central Finland Fake Hotel</div>
    </div>
  </div>
);

const Amenity = ({ title, desc, className, img, linkLoc }) => (
  <div className={className + " relative place-content-center flex flex-col"}>
    <Link
      to={linkLoc}
      className={
        "w-auto h-full mr-4 mb-4 place-content-center bg-cover flex flex-col z-0 contrast-50 " +
        img
      }
    />
    <div className=" opacity-100 z-10 blur-none absolute self-center text-white">
      <div className="text-3xl font-serif">{title}</div>
      <div>{desc}</div>
    </div>
  </div>
);

const Amenities = () => (
  <div className="block w-full h-auto pt-4 pl-4 pb-4 relative ">
    <Amenity
      className="w-3/5 h-[340px] float-left relative"
      title="Accommodations"
      desc="Find your paradise"
      linkLoc="/rooms"
      img="bg-accomadation  bg-[center_48rem]"
    />
    <Amenity
      className="w-2/5 h-[360px] float-right relative"
      title="Wellness Spa"
      desc="Let your cares fade away"
      linkLoc="/spa"
      img="bg-spa bg-cover text-white"
    />
    <Amenity
      className="w-3/5 h-[300px] float-left relative"
      title="Gourmet Cuisine"
      desc="World class service, locally inspired"
      linkLoc="/restaurant"
      img="bg-restaurant bg-cover bg-[center_left_29rem] text-white "
    />
    <Amenity
      className="w-2/5 h-[280px] float-right relative"
      title="Meetings & Events"
      desc="Lets Meet!"
      linkLoc="/"
      img="bg-events bg-cover bg-[right_17rem] text-white "
    />
  </div>
);

export const Landing = () => {
  return (
    <div className="mt-[96px]">
      <LandingHero />
      <Amenities />
    </div>
  );
};
