import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import SearchButton from "../Pagination/Pagination";
import "./css/carGrid.css";

const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchFilteredCars(cars);
    } else {
      const newItems = cars.filter((car) =>
        `${car.make} ${car.model}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchFilteredCars(newItems);
    }
  }, [searchTerm, cars]);

  return (
    <div className="car-list">
      <div className="car-grid">
        {searchFilteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image[2]} alt="" />
            <h2>
              {car.make} {car.model}
              <p style={{ float: "right" }}>
                <FavoriteBorderIcon />
              </p>
            </h2>
            <p style={{ color: "rgba(0, 124, 199, 1)", fontSize: "1.5rem" }}>
              ${car.price}
            </p>
            <div className="cars-info">
              <div>
                <CalendarMonthIcon />
              </div>
              <p style={{ color: "#fff" }}>{car.year}</p>
              <div>
                <LocalGasStationIcon />
              </div>
              <p style={{ color: "#fff" }}>{car.fuelType}</p>
              <div>
                <TimeToLeaveIcon />
              </div>
              <p style={{ color: "#fff" }}>{car.transmission}</p>
              <div>
                <PeopleAltIcon />
              </div>
              <p style={{ color: "#fff" }}>{car.owners}</p>
            </div>
          </div>
        ))}
      </div>
      <SearchButton />
    </div>
  );
};

export default CarGrid;
