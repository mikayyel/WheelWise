import FilterCars from "./components/FilterCars/FilterCars";
import Header from "./components/Header/Header";
import React from "react";
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
