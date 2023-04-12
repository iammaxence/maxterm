import React, { KeyboardEvent, useRef } from 'react';
import { invoke } from '@tauri-apps/api';
import { FileSystem, FilesAndFoldersSystem } from '../../domain/FilesAndFoldersSystem';
import { LocaleDate } from '../../domain/LocaleDate';

export type Result = {
	id: number
	content: string[],
}

export type Prompt = {
	id: number,
	time: string,
	content: string[]
}

export type TerminalObject = {
	id: number,
	time: string,
	prompt: {
		path: string,
		command: string,
	}
	result: FileSystem[],
}

const useHomeHelper = () => {
	const id = useRef<number>(0);
	const [inputValue, setInputValue] = React.useState('');
	const [currentDir, setCurrentDir] = React.useState('');
	const [terminalObjectList, setTerminalObjectList] = React.useState<TerminalObject[]>([]);

	async function fetchCurrentDir(): Promise<void> {
		const result: string = await invoke('get_current_dir');

		setCurrentDir(result);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, cmd: string): void {
		if(event.key ==='Enter') {
			applyCommand(parseCmd(cmd));
		}
	}

	function parseCmd(cmd: string): string[] {
		return cmd.split(' ');
	}

	function generateId(): number {
		id.current++;
		return id.current;
	}

	function buildTime(): string {
		return LocaleDate.create().format();
	}

	function buildTerminaObject(path: string, command: string, result: FileSystem[]): TerminalObject {
		return {
			id: generateId(),
			time: buildTime(),
			prompt: { path, command },
			result,
		};
	}

	function handleApplyCommandCd(newPath: string) {
		setTerminalObjectList((currentTerminalObjectList) => [
			...currentTerminalObjectList,
			buildTerminaObject(newPath, 'cd', [])]);
	}

	function handleFileAndFolderSystem(filesAndFoldersSystem: FilesAndFoldersSystem) {
		setTerminalObjectList((currentTerminalObjectList) => [
			...currentTerminalObjectList,
			buildTerminaObject(currentDir, 'ls', filesAndFoldersSystem.toFileSystem())]);
	}

	async function applyCommand(promptList: string[]): Promise<void> {
		const cmd = promptList.shift();

		if(cmd == 'clear') {
			setTerminalObjectList([]);
		} else if(cmd == 'ls') {
			const { files, folders } : {files: string[], folders: string[]} = await invoke('ls', { command: cmd, args: [currentDir, ...promptList] });
			handleFileAndFolderSystem(FilesAndFoldersSystem.of(files, folders));
		} else if(cmd == 'cd') {
			const result: string = await invoke('cd', { command: cmd, args: [currentDir, ...promptList] });
			setCurrentDir(result);
			handleApplyCommandCd(result);
		}

		setInputValue('');
	}

	return {
		fetchCurrentDir,
		handleKeyDown,
		applyCommand,
		terminalObjectList,
		currentDir,
		inputValue,
		setInputValue,
	};

};

export { useHomeHelper };