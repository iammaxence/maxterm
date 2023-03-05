import { useState } from 'react';
import { invoke } from '@tauri-apps/api';

const useHomeHelper = () => {

	const [inputValue, setInputValue] = useState('');
	const [currentDir, setCurrentDir] = useState('');
	const [textList, setTextList] = useState<string[]>([]);

	async function fetchCurrentDir(): Promise<void> {
		const result: string = await invoke('get_current_dir');
		setCurrentDir(result);
	}

	function handleKeyDown(event: any, cmd: string): void {
		if(event.key ==='Enter') {
			applyCommand(cmd);
		}
	}

	async function applyCommand(cmd: string): Promise<void> {
		console.log('Apply command');
		const result: string[] = await invoke('apply_command', { command: cmd, args: { body: [currentDir] } });
		setTextList(result);
	}

	return {
		fetchCurrentDir,
		handleKeyDown,
		applyCommand,
		textList,
		currentDir,
		inputValue,
		setInputValue
	};

};

export default useHomeHelper;