import { Typography } from '@mui/material';

export default function SinglePageHeader({ currentCar }) {
	return (
		<Typography variant='h2' color={'white'} marginTop={10} fontSize={{ xs: '40px', md: '60px' }}>
			{currentCar.make} {currentCar.model}
		</Typography>
	)
}