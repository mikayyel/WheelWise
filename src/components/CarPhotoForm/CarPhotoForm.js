import {
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  ImageListItem,
  Snackbar,
  Alert,
  ImageListItemBar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { VisuallyHiddenInput } from '../UserInformation/CustomComponents/VisuallyHiddenInput';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeImage, handleDeleteImage } from '../../redux/sellingCar';
import ClearIcon from '@mui/icons-material/Clear';

const CarPhotoForm = () => {
  const dispatch = useDispatch()
  const { image } = useSelector(state => state.sellingCarSlice)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFileChange = (e) => {
    if (image.length > 7) {
      setSnackbarMessage("You can upload a maximum of 8 images.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(handleChangeImage({ renderUrl: reader.result, storageObj: file }));
        };
        reader.readAsDataURL(file);

        setSnackbarMessage("Images uploaded successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage("Error uploading images. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleDelete = (index) => {
    dispatch(handleDeleteImage(index));
    setSnackbarMessage('Image deleted successfully!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#071620', borderRadius: '8px', color: '#fff', mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 3, display: 'inline-block' }}>
        Images
        <Divider
          sx={{
            bgcolor: "white",
            borderBottomWidth: "2px",
          }}
        />
      </Typography>

      <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>Upload your Image</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              width: '100%',
              height: 0,
              paddingTop: '100%',
              backgroundColor: '#0B0C10',
              border: '2px dashed #152836',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="upload image"
              tabIndex={-1}
              role={undefined}
              component="label"
              sx={{
                color: '#fff',
                fontSize: '3rem',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <AddIcon fontSize="inherit" />
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={1}>
            {image.map((img, i) => (
              <Grid item xs={3} sm={6} md={4}>
                <ImageListItem key={img.renderUrl}>
                  <img
                    src={img.renderUrl}
                    alt='Car'
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => handleDelete(i)}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CarPhotoForm;