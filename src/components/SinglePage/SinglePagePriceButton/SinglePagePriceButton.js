import { Button } from '@mui/material';

export default function SinglePagePriceButton({car}) {
	return (
		<Button 
			variant='outlined' 
			sx={{
				maxWidth: '400px',
				width: '100%',
				height: '60px',
				fontWeight: 'bold',
				fontSize: '24px',
				marginBottom: '100px'
			}}
		>
			{`$${car.price}`}
		</Button>
	)
}