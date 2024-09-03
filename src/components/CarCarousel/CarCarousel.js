import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
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
      showDots
    >
      {cars.map((car) => (
        <ul className="container" key={car.id} style={{ textAlign: "center" }}>
          <Link>
            <li>
              <i>
                <img
                  alt=""
                  style={{ width: 550, height: 400 }}
                  src={car.image[0]}
                />
              </i>
            </li>
          </Link>
        </ul>
      ))}
    </Carousel>
  );
};

export default CarCarousel;
