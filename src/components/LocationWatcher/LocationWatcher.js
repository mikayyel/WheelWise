import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleReset } from '../../redux/filterSlice';

const LocationWatcher = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useEffect(() => {
    if (
      prevLocation !== location.pathname &&
      location.pathname !== '/newcars' &&
      location.pathname !== '/usedcars'
    ) {
      dispatch(handleReset());
    }

    setPrevLocation(location.pathname);
  }, [location, prevLocation, dispatch]);

  return null;
};

export default LocationWatcher;
