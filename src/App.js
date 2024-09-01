import Home from "./pages/Home";
import Header from './components/Header/Header'
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FilterCars from "./components/FilterCars/FilterCars";
import SearchCars from "./components/SearchCars/SearchCars";
import CarGrid from "./components/CarGrid/CarGrid";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Main />
          <Header />
          <Home />
          <FilterCars />
          <SearchCars />
          <CarGrid />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
