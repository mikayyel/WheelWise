import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const SearchButton = () => {
  return (
    <Stack spacing={2} sx={{ alignItems: "center", p: 2 }}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            sx={{ color: "#fff" }}
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
