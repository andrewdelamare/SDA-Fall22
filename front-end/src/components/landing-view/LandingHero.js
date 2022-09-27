import img from "../../images/micheile-dot-com-GrdAN0NEIKY-unsplash.jpg";
export const LandingHero = () => (
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
