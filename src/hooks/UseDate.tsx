import { useEffect, useState } from 'react';

export const useDate = () => {

	const [currentDate, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);


	return currentDate;
};