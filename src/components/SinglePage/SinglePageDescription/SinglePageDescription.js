import { Typography } from '@mui/material';
import { useState } from 'react';
import './style.css';

export default function SinglePageDescription() {
	const [showLess, setShowLess] = useState(true);
	const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur officia tempore earum sunt magni impedit, beatae quod, pariatur ducimus laudantium eveniet nemo quasi, ex labore molestiae voluptas et iste';
	const max = 500;

	return (
		<>
			<Typography variant='h4' color={'white'} sx={{marginBottom: "10px"}}>
				Description
			</Typography>
			<Typography variant='body1' color={'white'} width={'600px'}>
				{showLess ? text.substring(0, max) : text}
			</Typography>		
			<Typography variant='body1' sx={{marginBottom: '10px'}}>
				{
					<a
						className='a' 
						href='#'
						onClick={(e) => {
							e.preventDefault();
							setShowLess(!showLess)
						}}
					>
						{showLess ? 'Read more' : 'Read less'}
					</a>
				}
			</Typography>
		</>
	)
}