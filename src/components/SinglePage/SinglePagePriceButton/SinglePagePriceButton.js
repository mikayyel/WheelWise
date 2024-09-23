import { Button } from '@mui/material';

export default function SinglePagePriceButton({ currentCar }) {
	return (
		<Button
			variant='outlined'
			sx={{
				width: '100%',
				height: '60px',
				fontWeight: 'bold',
				fontSize: '24px',
				marginBottom: { xs: '50px', md: '100px' }
			}}
		>
			{`$${currentCar.price}`}
		</Button>
	)
}