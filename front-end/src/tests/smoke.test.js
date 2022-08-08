import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../components/App";
import { Calendar } from "../components/Calendar";
import { DataView } from "../components/DataView";
import { ImportView } from "../components/ImportView";
import { Landing } from "../components/Landing";
import { NavBar } from "../components/Nav";
import { OrderButton } from "../components/OrderButton";
import { PageSelector } from "../components/PageSelector";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { Stations } from "../components/Stations";
import { StationView } from "../components/StationView";

test("Renders App component", () => {
  render(<App />);
});
test("Renders DataView component", () => {
  render(<DataView />);
});
test("Renders ImportView component", () => {
  render(<ImportView />);
});
test("Renders Landing component", () => {
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
});

test("Renders Calendar component", () => {
  render(
    <MemoryRouter>
      <Calendar selectedDay={new Date("4-5-2021")} />
    </MemoryRouter>
  );
});

test("Renders OrderButton component", () => {
  render(<OrderButton />);
});
test("Renders PageSelector component", () => {
  render(<PageSelector />);
});
test("Renders SearchBar component", () => {
  render(<SearchBar options={["fake", "fake2"]} />);
});
test("Renders Spinner component", () => {
  render(<Spinner />);
});
test("Renders Stations component", () => {
  render(<Stations />);
});
test("Renders StationView component", () => {
  render(<StationView />);
});
test("Renders Nav component", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
});
