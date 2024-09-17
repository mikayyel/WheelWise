import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { Chip, Stack, Typography } from '@mui/material';

export default function SinglePageFeature({car}) {
	return (
		<>
			<Typography variant='h4' color={'white'} sx={{marginBottom: '10px'}}>
				Feature
			</Typography>
			<Stack
				direction={'row'} 
				spacing={1}
				sx={{
					marginLeft: 0,
					paddingLeft: 0,
				}}
			>
				{
					car.features.map(feature => {
						return (
							<Chip 
								key={feature}
								color='info' 
								label={feature} 
								icon={<CheckBoxSharpIcon />}
								sx={{
									marginLeft: 0,
									borderRadius: 0,
									height: '50px',
									width: 'auto',
									backgroundColor: '#12232E',
								}}
							/>
						)
					})
				}
			</Stack>
		</>
	)
}
