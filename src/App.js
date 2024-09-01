import FilterCars from "./components/FilterCars/FilterCars";
import Header from "./components/Header/Header";
import "./App.css";
import SearchCars from "./components/SearchCars/SearchCars";
import CarGrid from "./components/CarGrid/CarGrid";

function App() {
  return (
    <div className="App">
      <Header />
      <FilterCars />
      <SearchCars />
      <CarGrid />
    </div>
  );
}

export default App;
