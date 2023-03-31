import React, { useEffect } from 'react';
import './Home.scss';
import { Prompt, Result, useHomeHelper } from './HomeHelper';
import { useDate } from '../../hooks/UseDate';

export default function Home() {
	const {
		inputValue,
		terminaObjectList,
		currentDir,
		fetchCurrentDir,
		setInputValue,
		handleKeyDown,
		isPrompt
	} = useHomeHelper();

	const currentDate = useDate();

	useEffect(() => {
		fetchCurrentDir();
	}, []);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [terminaObjectList]);

	function displayTerminalObjectPrompt(terminalObjectPrompt: Prompt) {
		const time = terminalObjectPrompt.time;
		const locationPath = terminalObjectPrompt.content[0];

		return (
			<div key={'prompt'+time+locationPath}>
				<div>[{time}] {locationPath}</div>
				<div className="home--prompt">
					{terminalObjectPrompt.content.slice(1).map((content) => <span key={'content_'+content+'_'+time}>{content}</span>)}
				</div>
			</div>
		);
	}

	function displayTerminalObjectResult(terminalObjectResult: Result) {
		return (
			<div className="home--result" key={'text1'+terminalObjectResult.content}>
				{terminalObjectResult.content.map((content) => <span key={'content'+content}>{content}</span>)}
			</div>);
	}

	return (
		<div className="home">
			<div className="home--text">
				{terminaObjectList.map((terminalObject) => {
					if(isPrompt(terminalObject)) {
						return displayTerminalObjectPrompt(terminalObject);
					}
					return displayTerminalObjectResult(terminalObject);
				})}
			</div>
			<div className="home--prompt">
				<div>[{currentDate.toLocaleTimeString()}] {currentDir}</div>
				<div className='home--input-bloc'>
					<div className='home--input-bloc-triangle'></div>
					<input
						className="home--input"
						type="text"
						value={inputValue}
						onInput={e => setInputValue((e.target as HTMLInputElement).value)}
						onKeyDown={(event) => handleKeyDown(event, inputValue)}>
					</input>
				</div>
			</div>
		</div>
	);
}