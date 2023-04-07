import React, { KeyboardEvent, useRef } from 'react';
import { invoke } from '@tauri-apps/api';
import { LocaleDate } from '../../domain/LocaleDate';
import { FileSystem, FilesAndFoldersSystem } from '../../domain/FilesAndFoldersSystem';

export type Result = {
	id: number
	content: string[],
}

export type Prompt = {
	id: number,
	time: string,
	content: string[]
}

export type TerminalObject = Prompt | Result | FileSystem[];

const useHomeHelper = () => {
	const id = useRef<number>(0);
	const [inputValue, setInputValue] = React.useState('');
	const [currentDir, setCurrentDir] = React.useState('');
	const [terminalObjectList, setTerminalObjectList] = React.useState<TerminalObject[]>([]);

	function isPrompt(obj: TerminalObject): obj is Prompt {
		return 'time' in obj;
	}

	function isFileSystems(obj: TerminalObject): obj is FileSystem[] {
		return Array.isArray(obj);
	}

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

	function buildResult(content: string[]): Result {
		return { id: generateId(), content };
	}

	function buildTime(): string {
		return LocaleDate.create().format();
	}

	function buildPrompt(currentDir: string, command: string): Prompt {
		return { id: generateId(), time: buildTime(), content: [ currentDir, command] } ;
	}

	function buildTerminalObject(currentList: TerminalObject[], contentToAdd: string[]): TerminalObject[] {
		return [...currentList, buildPrompt(currentDir, inputValue), buildResult(contentToAdd)];
	}

	function handleApplyCommandResult(result: string[]) {
		setTerminalObjectList((currentTerminalObjectList) => buildTerminalObject(currentTerminalObjectList, result));
	}

	function handleFileAndFolderSystem(filesAndFoldersSystem: FilesAndFoldersSystem) {
		setTerminalObjectList((currentTerminalObjectList) => [...currentTerminalObjectList, buildPrompt(currentDir, inputValue), filesAndFoldersSystem.toFileSystem()]);
	}

	async function applyCommand(promptList: string[]): Promise<void> {
		const cmd = promptList.shift();

		if(cmd == 'clear') {
			setTerminalObjectList([]);
		} else if(cmd == 'ls') {
			const { files, folders }: {files: string[], folders: string[]}= await invoke('ls', { command: cmd, args: [currentDir, ...promptList] });
			handleFileAndFolderSystem(FilesAndFoldersSystem.of(files, folders));
		} else if(cmd == 'cd') {
			const result: string = await invoke('cd', { command: cmd, args: [currentDir, ...promptList] });
			setCurrentDir(result);
			handleApplyCommandResult([]);
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
		isPrompt,
		isFileSystems,
	};

};

export { useHomeHelper };