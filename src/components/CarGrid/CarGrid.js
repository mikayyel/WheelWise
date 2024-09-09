import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import SearchButton from "../Pagination/Pagination";
import "./css/carGrid.css";
import { useDebounce } from "use-debounce";
import { Typography } from "@mui/material";

const CarGrid = ({ cars, searchTerm }) => {
  const [searchFilteredCars, setSearchFilteredCars] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setSearchFilteredCars(cars);
    } else {
      const newItems = cars.filter((car) =>
        `${car.make} ${car.model}`
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setSearchFilteredCars(newItems);
    }
  }, [debouncedSearchTerm, cars]);

  return (
    <div className="car-list">
      <div className="car-grid">
        {searchFilteredCars.length > 0 ? (
          searchFilteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image[2]} alt="" />
              <h2>
                {car.make} {car.model}
                <p style={{ float: "right" }}>
                  <FavoriteBorderIcon />
                </p>
              </h2>
              <p>${car.price}</p>
              <div className="cars-info">
                <div>
                  <CalendarMonthIcon />
                </div>
                <p>{car.year}</p>
                <div>
                  <LocalGasStationIcon />
                </div>
                <p>{car.fuelType}</p>
                <div>
                  <TimeToLeaveIcon />
                </div>
                <p>{car.transmission}</p>
                <div>
                  <PeopleAltIcon />
                </div>
                <p>{car.owners}</p>
              </div>
            </div>
          ))
        ) : (
          <Typography className="no-results">
            No information matching your request was found.
          </Typography>
        )}
      </div>
      <SearchButton />
    </div>
  );
};

export default CarGrid;
