import React, { useEffect } from 'react';
import './Home.scss';
import { Prompt, Result, TerminalObject, useHomeHelper } from './HomeHelper';
import { useDate } from '../../hooks/UseDate';
import { LocaleDate } from '../../domain/LocaleDate';
import { FileSystem } from '../../domain/FilesAndFoldersSystem';

export default function Home() {
	const {
		inputValue,
		currentDir,
		fetchCurrentDir,
		setInputValue,
		handleKeyDown,
		isPrompt,
		isFileSystems,
		terminalObjectList,
	} = useHomeHelper();

	const currentDate = useDate();

	useEffect(() => {
		fetchCurrentDir();
	}, []);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [terminalObjectList]);

	function displayTerminalObjectPrompt(terminalObjectPrompt: Prompt) {
		const time = terminalObjectPrompt.time;
		const locationPath = terminalObjectPrompt.content[0];

		return (
			<div key={terminalObjectPrompt.id}>
				<div>[{time}] {locationPath}</div>
				<div className="home--prompt">
					{terminalObjectPrompt.content.slice(1).map((content) => <span key={'content_'+content+'_'+time}>{content}</span>)}
				</div>
			</div>
		);
	}

	function displayTerminalObjectResult(terminalObjectResult: Result) {
		return (
			<div className="home--result" key={terminalObjectResult.id}>
				{terminalObjectResult.content.map((content) => <span key={'content'+content}>{content}</span>)}
			</div>);
	}

	function displayFilesAndFoldersSystem(fileSystems: FileSystem[]){
		return (
			<div className="home--result">
				{
					fileSystems.map((fileSystem) =>
						<span className={fileSystem.type === 'Folder' ? 'home--folder': ''} key={'content'+fileSystem.name}>{fileSystem.name}</span>)
				}
			</div>
		);
	}

	return (
		<div className="home">
			<div className="home--text">
				{terminalObjectList.map((terminalObject: TerminalObject) => {
					if(isPrompt(terminalObject)) {
						return displayTerminalObjectPrompt(terminalObject);
					} else if (isFileSystems(terminalObject)) {
						return displayFilesAndFoldersSystem(terminalObject);
					} else {
						return displayTerminalObjectResult(terminalObject);
					}
				})}
			</div>
			<div className="home--prompt">
				<div>[{LocaleDate.of(currentDate).format()}] {currentDir}</div>
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