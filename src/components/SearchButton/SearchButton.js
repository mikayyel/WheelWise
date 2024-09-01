import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const SearchButton = () => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            sx={{ color: "#fff", margin: 2 }}
            slots={{
              previous: ArrowCircleLeftIcon,
              next: ArrowCircleRightIcon,
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default SearchButton;
