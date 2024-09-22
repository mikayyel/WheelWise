import { Box, Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Map from '../Map/Map';
import SendMessage from '../SendMessage/SendMessage';
import SinglePageCarousel from './SinglePageCarousel/SinglePageCarousel';
import SinglePageDescription from './SinglePageDescription/SinglePageDescription';
import SinglePageFeature from './SinglePageFeature/SinglePageFeature';
import SinglePageHeader from './SinglePageHeader/SinglePageHeader';
import SinglePagePriceButton from './SinglePagePriceButton/SinglePagePriceButton';
import SinglePageSidebar from './SinglePageSidebar/SinglePageSidebar';
import CreditSimulation from './CreditSimulation/CreditSimulation';

function SinglePage() {
	const currentCarId = useSelector((state) => state.currentCar.currentCar.id);
	const currentCar = useSelector((state) => state.currentCar.currentCar);

	console.log(currentCarId)

	return (
		<>
			<Container>
				<SinglePageHeader currentCar={currentCar} />
			</Container>
			<SinglePageCarousel currentCar={currentCar} />

			<Container sx={{ mb: 10 }} >
				<Grid container spacing={4} wrap='wrap-reverse'>
					<Grid item md={8} xs={12}>
						<SinglePageDescription />
						<SinglePageFeature currentCar={currentCar} />
						<Box pt={2} maxWidth={'600px'} mb={3}>
							<SendMessage title={'Contact'} />
						</Box>
						<Map maxWidth={'600px'} title={'Location'} />
					</Grid>
					<Grid item md={4} xs={12}>
						<SinglePagePriceButton currentCar={currentCar} />
						<SinglePageSidebar currentCar={currentCar} />
					</Grid>
				</Grid>
			</Container>
			<CreditSimulation />
		</>
	)
}

export default SinglePage;



