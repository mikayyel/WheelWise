export const BODY_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Wagon",
  "Pickup Truck",
  "Van",
  "Minivan",
  "Crossover",
  "Roadster",
  "Compact",
  "Sports Car",
  "Luxury Sedan",
  "Electric (EV)",
  "Hybrid"
]

export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Unfocused border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused
    },
  },
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
  "& .MuiInputLabel-root": {
    color: "white", // Label color
  },
  "& .MuiSvgIcon-root": {
    color: "white", // Icon color (for dropdown arrow)
  },
  "& .MuiFormHelperText-root": {
    color: "white", // Helper text color
  },
};