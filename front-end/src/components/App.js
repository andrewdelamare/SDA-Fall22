import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./landing-view/Landing";
import { Trips } from "./journeys-view/Trips";
import { NavBar } from "./Nav";
import { Stations } from "./stations-list-view/Stations";
import { StationView } from "./station-view/StationView";
import { DataView } from "./data-view/DataView";
import { ImportView } from "./import-view/ImportView";
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
