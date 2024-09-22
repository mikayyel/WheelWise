import { Pagination, PaginationItem, Stack } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect } from "react";

const PaginationControl = ({ page, setSearchParams, totalCars, itemsPerPage }) => {
  const totalPages = Math.ceil(totalCars / itemsPerPage);

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value, limit: itemsPerPage });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page])

  return (
    <Stack spacing={2} sx={{ alignItems: "center", p: 4 }}>
      <Pagination
        onChange={handlePageChange}
        count={totalPages}
        page={page}
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
            components={{
              previous: KeyboardArrowLeftIcon,
              next: KeyboardArrowRightIcon
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationControl;