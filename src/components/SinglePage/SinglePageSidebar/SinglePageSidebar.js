import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function SinglePageSidebar({car}) {
	return (
		<List 
			sx={{
				py: 0,
				width: '100%',
				maxWidth: '400px',
				color: 'white',
				backgroundColor: '#071620',
				marginBottom: '30px'
			}}
		>
			<ListItem>
				<ListItemText primary='Car Details'/>
			</ListItem>
			<ListItem>
				<ListItemText primary='Brand' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.make}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Model' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.model}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Year' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.year}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Exterior Color' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.color}</Typography>
			</ListItem>
			<Divider variant="middle" component="li" sx={{borderColor: 'white'}}/>
			<ListItem>
				<ListItemText primary='Engine'/>
			</ListItem>
			<ListItem>
				<ListItemText primary='Fuel Type' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.fuelType}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Milage' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{`${car.mileage} km`}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Transmission' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{car.transmission}</Typography>
			</ListItem>
			<ListItem>
				<ListItemText primary='Power' sx={{color: '#A9A9A9'}}/>
				<Typography variant='body1'>{`${car.horsepower} hp`}</Typography>
			</ListItem>

		</List>
	)
}