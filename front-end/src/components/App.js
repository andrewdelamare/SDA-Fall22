import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./Landing";
import { Trips } from "./Trips";
import { NavBar } from "./Nav";
import { Stations } from "./Stations";
import { StationView } from "./StationView";
import { DataView } from "./DataView";
import { ImportView } from "./ImportView";
import { Footer } from "./Footer";
function App() {
  return (
    <BrowserRouter>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Rajdhani|Fredericka+the+Great"
      ></link>

      <div className="overflow-x-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/data" element={<DataView />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/:id" element={<StationView />} />
          <Route path="/upload" element={<ImportView />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
