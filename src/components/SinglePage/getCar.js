import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

async function getCar({currentCar}) {
	const carRef = doc(db, "cars", currentCar.id);
	const carSnap = await getDoc(carRef);
	const car = carSnap.data();
	return car;
}

export default getCar;