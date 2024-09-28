import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';

export default function SinglePageDescription({ currentCar }) {
	const [showLess, setShowLess] = useState(true);
	const text = currentCar.description ? currentCar.description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste';
	const max = 500;

	const toggleShowLess = (event) => {
		event.preventDefault();
		setShowLess((prevShowLess) => !prevShowLess);
	};

	return (
		<Box sx={{ mb: 2 }}>
			<Typography variant='h4' color={'white'} sx={{ marginBottom: "10px" }}>
				Description
			</Typography>
			<Typography variant='body1' color={'white'} maxWidth={'600px'} textAlign={'justify'}>
				{showLess ? text.substring(0, max) : text}
			</Typography>
			{text.length > 500 &&
				<Link
					href="#"
					onClick={toggleShowLess}
					sx={{ display: 'block', color: '#007CC7', textDecoration: 'none' }}
				>
					{showLess ? 'Read more' : 'Read less'}
				</Link>}
		</Box >
	)
}