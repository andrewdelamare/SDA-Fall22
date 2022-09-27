import { Link } from "react-router-dom";
export const Tile = ({ title, desc, className, img, linkLoc }) => (
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
