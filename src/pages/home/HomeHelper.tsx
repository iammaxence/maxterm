import React from 'react';
import { invoke } from '@tauri-apps/api';

interface TerminalObject {
	type: 'prompt' | 'text',
	content: string[]
}

const useHomeHelper = () => {

	const [inputValue, setInputValue] = React.useState('');
	const [currentDir, setCurrentDir] = React.useState('');
	const [terminaObjectList, setTerminaObjectList] = React.useState<TerminalObject[]>([]);

	async function fetchCurrentDir(): Promise<void> {
		const result: string = await invoke('get_current_dir');
		setCurrentDir(result);
	}

	function handleKeyDown(event: any, cmd: string): void {
		if(event.key ==='Enter') {
			applyCommand(cmd);
		}
	}

	function buildTerminalObject(currentList: TerminalObject[], contentToAdd: string[]): TerminalObject[] {
		const responseText: TerminalObject = { type: 'text', content: contentToAdd };
		const prompt: TerminalObject = { type: 'prompt', content: [ currentDir, inputValue] } ;
		return [...currentList, prompt, responseText];
	}

	function handleApplyCommandResult(result: string[]) {
		if(result.length === 0) {
			setTerminaObjectList([]);
		} else {
			setTerminaObjectList((currentTerminalObjectList) => buildTerminalObject(currentTerminalObjectList, result));
		}
		
		setInputValue('');
	}

	async function applyCommand(cmd: string): Promise<void> {
		const result: string[] = await invoke('apply_command', { command: cmd, args: { body: [currentDir] } });
		handleApplyCommandResult(result);
	}

	return {
		fetchCurrentDir,
		handleKeyDown,
		applyCommand,
		terminaObjectList,
		currentDir,
		inputValue,
		setInputValue
	};

};

export default useHomeHelper;