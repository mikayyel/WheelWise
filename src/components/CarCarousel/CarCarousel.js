import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./css/carCarousel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CarCarousel = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function getCars() {
      try {
        const carsCol = collection(db, "cars");
        const carSnapshot = await getDocs(carsCol);
        setCars(
          carSnapshot.docs.map((car) => ({
            id: car.id,
            ...car.data(),
          }))
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getCars();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      arrows
      autoPlaySpeed={3000}
      renderDotsOutside={false}
    >
      {cars.map((car) => (
        <div key={car.id} className="car-carousel">
          <div className="car-images">
            {car.image.slice(0, 1).map((img) => (
              <img
                key={img}
                style={{ width: "100%", height: 220, objectFit: "cover" }}
                src={img}
                alt=""
              />
            ))}
          </div>
          <h2>
            {car.make} {car.model}
            <p style={{ float: "right" }}></p>
          </h2>
          <p style={{ color: "rgba(0, 124, 199, 1)", fontSize: "1.5rem" }}>
            ${car.price}
          </p>
          <div className="carousel-info ">
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
    </Carousel>
  );
};

export default CarCarousel;
