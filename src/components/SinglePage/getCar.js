import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

async function getCar() {
	const carRef = doc(db, "cars", "svWglsGkT69zKhcJdsrO");
	const carSnap = await getDoc(carRef);
	const car = carSnap.data();
	return car;
}

export default getCar;