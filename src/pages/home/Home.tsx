import React, { useEffect } from 'react';
import './Home.scss';
import useHomeHelper from './HomeHelper';

export default function Home() {
	const {
		inputValue,
		textList,
		currentDir,
		fetchCurrentDir,
		setInputValue,
		handleKeyDown
	} = useHomeHelper();

	useEffect(() => {
		fetchCurrentDir();
	}, []);

	return (
		<div className="home">
			<div>{currentDir}</div>
			{textList.map((text, index) => <span key={`${text}+${index}`}>{text}</span>)}
			<input
				className="home--input"
				type="text"
				value={inputValue}
				onInput={e => setInputValue((e.target as HTMLInputElement).value)}
				onKeyDown={(event) => handleKeyDown(event, inputValue)}>
			</input>
		</div>
	);
}