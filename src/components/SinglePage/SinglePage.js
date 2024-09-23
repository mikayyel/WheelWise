import { Box, Container, Grid } from "@mui/material";
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
import CreditSimulation from "./CreditSimulation/CreditSimulation";

function SinglePage() {
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

      <Container sx={{ mb: 10 }}>
        <Grid container spacing={4} wrap="wrap-reverse">
          <Grid item md={8} xs={12}>
            <SinglePageDescription />
            <SinglePageFeature currentCar={currentCar} />
            <Box pt={2} maxWidth={"600px"} mb={3}>
              <SendMessage title={"Contact"} />
            </Box>
            <Map maxWidth={"600px"} title={"Location"} />
          </Grid>
          <Grid item md={4} xs={12}>
            <SinglePagePriceButton currentCar={currentCar} />
            <SinglePageSidebar currentCar={currentCar} />
          </Grid>
        </Grid>
      </Container>
      <CreditSimulation />
    </>
  );
}

export default SinglePage;
