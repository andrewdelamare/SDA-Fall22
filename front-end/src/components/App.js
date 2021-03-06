import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Landing } from "./Landing";
import { NavBar } from "./Nav";
function App() {
  let { size } = useParams();
  /* <Route path="/" element={<Landing />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/book" element={<Booking />}>
            <Route path=":size" element={<Booking size={size} />} />
          </Route>
          <Route path="/spa" element={<Spa />} />
          <Route path="/restaurant" element={<Restaurant />} /> */
  //<Footer />

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/data" element={<Landing />} />
          <Route path="/trips" element={<Landing />} />
          <Route path="/stations" element={<Landing />} />
          <Route path="/import" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
