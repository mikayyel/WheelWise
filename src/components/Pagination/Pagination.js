import { useState } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const itemsPerPage = 10;

const PaginationControl = ({ cars }) => {
  // const [page, setPage] = useState(1);
  // const totalPages = Math.ceil(cars.length / itemsPerPage);


  return (
    <Stack spacing={2} sx={{ alignItems: "center", p: 4 }}>
      <Pagination
        // onChange={(event, value) => setPage(value)}
        // count={totalPages}
        // page={page}
        renderItem={(item) => (
          <PaginationItem
            sx={{
              color: "#fff",
              fontSize: "14px",
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
              '&.Mui-selected': {
                backgroundColor: "#007CC7",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "#005B9A",
              },
            }}
            slots={{
              previous: KeyboardArrowLeftIcon,
              next: KeyboardArrowRightIcon,
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationControl;

// import { Container, Grid } from "@mui/material";
// import CarGrid from './CarGrid'; // Assuming this component displays your list of cars


// const PaginatedCars = ({ cars }) => {
//   // Get cars for the current page
//   const currentCars = cars.slice(
//     (page - 1) * itemsPerPage, // Starting index
//     page * itemsPerPage // Ending index
//   );

//   return (
//     <Container>
//       {/* Car Grid */}
//       <Grid container spacing={2}>
//         <CarGrid cars={currentCars} />
//       </Grid>
//     </Container>
//   );
// };