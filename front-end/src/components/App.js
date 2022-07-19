import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
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
        <Routes></Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
