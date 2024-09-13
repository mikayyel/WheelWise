import { Typography } from '@mui/material';

export default function SinglePageHeader({car}) {
	return (
			<Typography variant='h2' color={'white'} marginTop={10}>
				{car.make} {car.model}
			</Typography>
	)
}