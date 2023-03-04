import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import './Home.scss';

export default function Home() {
	const [currentDir, setCurrentDir] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [textList, setTextList] = useState<string[]>([]);

	useEffect(() => {
		const fetchCurrentDir = async () => {
			const result: string = await invoke('get_current_dir');
			setCurrentDir(result);
		};
		fetchCurrentDir().catch((error) => console.error(error));
	}, []);

	function handleKeyDown(event: any) {
		if(event.key ==='Enter') {
			applyCommand();
		}
	}

	async function applyCommand() {
		console.log('Apply command');
		const result: string[] = await invoke('apply_command', { command: inputValue, args: { body: [currentDir] } });
		setTextList(result);
	}

	return (
		<div className="home">
			<div>{currentDir}</div>
			{textList.map((text, index) => <span key={`${text}+${index}`}>{text}</span>)}
			<input
				className="home--input"
				type="text"
				value={inputValue}
				onInput={e => setInputValue((e.target as HTMLInputElement).value)}
				onKeyDown={(event) => handleKeyDown(event)}>
			</input>
		</div>
	);
}