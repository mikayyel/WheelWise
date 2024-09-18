import { Typography } from '@mui/material';

export default function SinglePageHeader({currentCar}) {
	return (
			<Typography variant='h2' color={'white'} marginTop={10}>
				{currentCar.make} {currentCar.model}
			</Typography>
	)
}