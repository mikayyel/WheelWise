import { Container, Grid } from '@mui/material';
import SinglePageCarousel from './SinglePageCarousel/SinglePageCarousel';
import SinglePageDescription from './SinglePageDescription/SinglePageDescription';
import SinglePageFeature from './SinglePageFeature/SinglePageFeature';
import SinglePageHeader from './SinglePageHeader/SinglePageHeader';
import SinglePagePriceButton from './SinglePagePriceButton/SinglePagePriceButton';
import SinglePageSidebar from './SinglePageSidebar/SinglePageSidebar';

function SinglePage() {
	// const [car, setCar] = useState();

	// useEffect(() => {
	// 	getCar().then(data => setCar(data));
	// }, [])
	const car = {
		make: "BMW",
		mileage: 14000,
		model: "X5",
		owners: 2,
		price: 55000,
		transmission: "Automatic",
		year: 2021,
		fuelType: "Diesel",
		horsepower: 335,
		id: "A4kZv3QZATaMQUPpEQN6",
		color: "Black",
		engine: "3.0L 6-cylinder",
		features: ['Heated Seats', 'Wireless Charging', 'Gesture Control'],
		images: [
			"https://avatars.mds.yandex.net/get-verba/1540742/2a0000018896b6a62f74031be3bed4b6984d/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/216201/2a0000018896cc0c9bfe671798fea034ba16/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/937147/2a0000018896cc14a3c8230153f58ba3e96b/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/216201/2a0000018896cc2ba341c020aecf67799f65/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/216201/2a0000018896cc3d99da6e698cdf257452c7/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/787013/2a0000018896cc4cfdd67ebe91be3a77146d/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/216201/2a0000018896cc9a1b94275cf3d6f990b62b/cattouchret", 
			"https://avatars.mds.yandex.net/get-verba/216201/2a0000018896ccba5a56b3f23b04730ff375/cattouchret"
		]
	}


	return (
		<>
			<Container>
				<SinglePageHeader car={car}/>
			</Container>
			<SinglePageCarousel car={car}/>

			<Container>
				<Grid container>			
					<Grid item md={8}>
						<SinglePageDescription/>
						<SinglePageFeature car={car}/>
					</Grid>
					<Grid item md={4}>
						<SinglePagePriceButton car={car}/>
						<SinglePageSidebar car={car}/>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default SinglePage;