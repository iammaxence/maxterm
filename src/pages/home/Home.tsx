import React, { useEffect } from 'react';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
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

	return (
		<div className="home">
			<div className="home--text">
				{terminaObjectList.map((terminalObject) => {
					if(isPrompt(terminalObject)) {
						return (
							<div className="home--prompt" key={'prompt1'+terminalObject.content}>
								[{ terminalObject.time }]{terminalObject.content.map((content) => <span key={'content'+content}>{content}</span>)}
							</div>
						);
					}
					return (
						<div className="home--result" key={'text1'+terminalObject.content}>
							{terminalObject.content.map((content) => <p key={'content'+content}>{content}</p>)}
						</div>);
				})}
			</div>
			<div className="home--prompt">
				<div>[{currentDate.toLocaleTimeString()}] {currentDir}</div>
				<input
					className="home--input"
					type="text"
					value={inputValue}
					onInput={e => setInputValue((e.target as HTMLInputElement).value)}
					onKeyDown={(event) => handleKeyDown(event, inputValue)}>
				</input>
			</div>
		</div>
	);
}