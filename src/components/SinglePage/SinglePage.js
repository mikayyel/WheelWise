import { Box, Container, Grid } from "@mui/material";
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
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { RecenterMap } from "../Location/Location";
import { useSelector } from "react-redux";

function SinglePage() {
  const { id } = useParams();
  const [currentCar, setCurrentCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { location } = useSelector(state => state.sellingCarSlice)

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
      {currentCar.image.length && <SinglePageCarousel currentCar={currentCar} />}

      <Container sx={{ mb: 10 }}>
        <Grid container spacing={4} wrap="wrap-reverse">
          <Grid item md={8} xs={12}>
            <SinglePageDescription currentCar={currentCar} />
            <SinglePageFeature currentCar={currentCar} />
            <Box pt={2} maxWidth={"600px"} mb={3}>
              <SendMessage title={"Contact"} />
            </Box>
            <MapContainer
              center={currentCar.location || location}
              zoom={13}
              style={{ height: "350px", maxWidth: "600px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={currentCar.location || location} />
              <RecenterMap location={currentCar.location || location} />
            </MapContainer>
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
