import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.css';

export default function SinglePageCarousel({car}) {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};
	
	return (
		<Carousel
			arrows={true}
			showDots={true}
			responsive={responsive}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			autoPlaySpeed={1000}
			keyBoardControl={true}
			containerClass="carousel-container"
			removeArrowOnDeviceType={["tablet", "mobile"]}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
		>
			{/* <img src={car.images[0]} alt='img' className='img'/>
			<img src={car.images[1]} alt='img' className='img'/>
			<img src={car.images[2]} alt='img' className='img'/>
			<img src={car.images[3]} alt='img' className='img'/>
			<img src={car.images[4]} alt='img' className='img'/> */}
			{
				car.images.map(image => {
					return (
						<img src={image} alt='img' className='img'/>
					)
				})
			}
		</Carousel>
	)
}