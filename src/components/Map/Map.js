import { Box, Typography } from "@mui/material";

function Map({ marginTop, maxWidth, title }) {
  return (
    <>
      {title && <Typography variant='h4'
        sx={{
          color: 'white',
          mb: 2
        }}
      >
        {title}
      </Typography>}
      <Box mt={marginTop} maxWidth={maxWidth}
        sx={{
          height: "500px",
          width: "100%",
          overflow: 'hidden'
        }}
      >
        <iframe
          title="map"
          width="100%"
          height="100%"
          style={{ border: 0, marginTop: marginTop, marginBottom: marginTop }}
          src="https://maps.google.com/maps?width=620&amp;height=400&amp;hl=en&amp;q=3%20Hakob%20Hakobyan,Yerevan,Armenia+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          allowFullScreen
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </Box>
    </>
  );
}

export default Map;

