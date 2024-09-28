export const selectStyle = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
      borderWidth: '1px',
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
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white", // Label color when active/focused
  },
  "& .MuiSvgIcon-root": {
    color: "white", // Icon color (for dropdown arrow)
  },
  "& .MuiFormHelperText-root": {
    color: "white", // Helper text color
  },
};

export const years = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

export const exteriorColors = [
  'White',
  'Black',
  'Silver',
  'Gray',
  'Blue',
  'Red',
  'Brown',
  'Green',
  'Yellow',
  'Gold',
  'Orange',
  'Beige',
  'Purple',
  'Bronze',
  'Burgundy',
  'Ivory',
  'Maroon',
  'Navy Blue',
  'Pearl White',
  'Champagne',
  'Cyan',
  'Teal',
  'Magenta',
  'Olive',
  'Turquoise',
  'Graphite',
  'Midnight Blue',
  'Matte Black',
  'Sapphire Blue',
  'Candy Apple Red',
  'Sunset Orange',
  'Lime Green'
];

export const customInputStyle = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiFormLabel-root": {
    color: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    color: 'white'
  }
}

export const menuPaperPropsStyle = {
  bgcolor: '#1D384C',
  color: '#fff',
  maxHeight: '300px', // Set max height for the dropdown
  overflowY: 'auto', // Enable vertical scrolling
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-track': {
    background: '#1D384C', // Track background
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#3B7A99', // Thumb color
    borderRadius: '4px', // Rounded thumb
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#528FA1', // Hover color
  },
}