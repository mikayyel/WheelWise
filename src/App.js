import FilterCars from "./components/FilterCars/FilterCars";
import Header from "./components/Header/Header";
import "./App.css";
import SearchCars from "./components/SearchCars/SearchCars";

function App() {
  return (
    <div className="App">
      <Header />
      <FilterCars />
      <SearchCars />
    </div>
  );
}

export default App;
