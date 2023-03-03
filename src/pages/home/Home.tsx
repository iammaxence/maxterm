import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import './Home.scss';

export default function Home() {
	const [currentDir, setCurrentDir] = useState('');

	useEffect(() => {
		const fetchCurrentDir = async () => {
			const result: string = await invoke('getCurrentDir', { name: 'World' });
			console.log('Result :  '+ result);
			setCurrentDir(result);
		};
		fetchCurrentDir().catch((error) => console.error(error));
	}, []);
  

	return (
		<div className="home">
			<div>{currentDir}</div>
			<input className="home--input" type="text"></input>
		</div>
	);
}