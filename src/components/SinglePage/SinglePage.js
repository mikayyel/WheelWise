import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Map from "../Map/Map";
import SendMessage from "../SendMessage/SendMessage";
import SinglePageCarousel from "./SinglePageCarousel/SinglePageCarousel";
import SinglePageDescription from "./SinglePageDescription/SinglePageDescription";
import SinglePageFeature from "./SinglePageFeature/SinglePageFeature";
import SinglePageHeader from "./SinglePageHeader/SinglePageHeader";
import SinglePagePriceButton from "./SinglePagePriceButton/SinglePagePriceButton";
import SinglePageSidebar from "./SinglePageSidebar/SinglePageSidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function SinglePage() {
  // const currentCarId = useSelector((state) => state.currentCar.currentCar.id);
  // const currentCar = useSelector((state) => state.currentCar.currentCar);

  // console.log("currentCarId");

  // useEffect(() => {
  // 	const fetchCar = async () => {
  // 		try {
  // 			const carsCol = collection(db, "cars");
  //     	const carSnapshot = await getDocs(carsCol);
  // 			carSnapshot.docs.map(doc => {
  // 				if(doc.data().id === currentCarId){
  // 					setCurrentCar(doc.data());
  // 				}
  // 			});
  // 			console.log(currentCar)
  // 		} catch(error) {
  // 			console.log(error.message);
  // 		}
  // 	}

  // 	fetchCar()
  // }, [])

  const { id } = useParams();
  const [currentCar, setCurrentCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDocRef = doc(db, "cars", id);
        const carDoc = await getDoc(carDocRef);

        if (carDoc.exists()) {
          setCurrentCar({ id: carDoc.id, ...carDoc.data() });
        } else {
          console.log("Car not found");
        }
      } catch (error) {
        console.log("Error fetching car:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentCar) {
    return <p>Car not found</p>;
  }

  return (
    <>
      <Container>
        <SinglePageHeader currentCar={currentCar} />
      </Container>
      <SinglePageCarousel currentCar={currentCar} />

      <Container>
        <Grid container>
          <Grid item md={8}>
            <SinglePageDescription />
            <SinglePageFeature currentCar={currentCar} />
            <SendMessage title={"Contact"} />
            <Map maxWidth={"600px"} title={"Location"} marginTop={"20px"} />
          </Grid>
          <Grid item md={4}>
            <SinglePagePriceButton currentCar={currentCar} />
            <SinglePageSidebar currentCar={currentCar} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SinglePage;
