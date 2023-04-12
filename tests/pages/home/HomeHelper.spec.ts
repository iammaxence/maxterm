import { describe, vi } from 'vitest';
import { mockIPC } from '@tauri-apps/api/mocks';
import { renderHook, waitFor } from '@testing-library/react';
import { useHomeHelper } from '../../../src/pages/home/HomeHelper';
import { randomFillSync } from 'crypto';

let component;

describe('useHomeHelper', async () => {
	beforeAll(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		window.crypto = {
			getRandomValues: function (buffer: any) {
				return randomFillSync(buffer);
			},
		};
	});

	beforeEach(() => {
		const { result } = renderHook(() => useHomeHelper());
		component = result;
	});
	
	it('Shoud fetch path of current dir', async () => {
		mockIPC((cmd, _) => {
			if(cmd === 'get_current_dir') {
				return Promise.resolve('/test');
			}
		});
		
		component.current.fetchCurrentDir();

		await waitFor(() => {
			expect(component.current.currentDir).toBe('/test');
		});

	});

	// describe('Prompt', () => {
	// 	it('Should be true', () => {
	// 		const prompt: TerminalObject = { id: 1, time: '2011-10-05T14:48:00', content: ['test'] };

	// 		expect(component.current.isPrompt(prompt)).toBe(true);
	// 	});

	// 	it('Should be false', () => {
	// 		const terminalObject: TerminalObject = { id: 1, content: ['test'] };

	// 		expect(component.current.isPrompt(terminalObject)).toBe(false);
	// 	});
	// });

	// describe('FileSystems', () => {
	// 	it('Should be true', () => {
	// 		const fileSystems: FileSystem[] = [{ type: 'File', name: 'test' }, { type: 'Folder', name: 'test1' }]; 

	// 		expect(component.current.isFileSystems(fileSystems)).toBe(true);
	// 	});
	// 	it('Should be false', () => {
	// 		const terminalObject: TerminalObject = { id: 1, content: ['test'] };

	// 		expect(component.current.isFileSystems(terminalObject)).toBe(false);
	// 	});
	// });

	describe('Should apply command', () => {
		it('clear', async () => {
			component.current.applyCommand(['clear']);
			
			await waitFor(() => {
				expect(component.current.terminalObjectList).toEqual([]);
			});
		});

		it('ls', async () => {
			mockIPC((cmd, _) => {
				if(cmd === 'ls') {
					return Promise.resolve({ files: ['file1', 'file2'], folders: ['folder1', 'folder2'] });
				}
			});

			component.current.applyCommand(['ls']);
			
			await waitFor(() => {
				const time = component.current.terminalObjectList[0].time;
				expect(component.current.terminalObjectList).toEqual([{
					id: 1,
					time,
					prompt: {
						path: '',
						command: 'ls',
					},
					result: [{ name: 'file1', type: 'File' }, { name: 'file2', type: 'File' }, { name: 'folder1', type: 'Folder' }, { name: 'folder2', type: 'Folder' }]
				}]);
			});
		});

		it('cd', async () => {
			mockIPC((cmd, _) => {
				if(cmd === 'cd') {
					return Promise.resolve('/test/path');
				}
			});

			component.current.applyCommand(['cd']);

			await waitFor(() => {
				const time = component.current.terminalObjectList[0].time;
				expect(component.current.terminalObjectList).toEqual([{
					id: 1,
					time,
					prompt: {
						path: '/test/path',
						command: 'cd',
					},
					result: []
				}]);
			});
		});
	});

	// describe('HandleKeyDown', () => {
	// 	it('Should apply command when press enter', async () => {
	// 		const spy = vi.spyOn(component.current, 'applyCommand');
	// 		const event = {
	// 			key: 'Enter',
	// 		} as KeyboardEvent;

	// 		component.current.handleKeyDown(event, 'cd');

	// 		await waitFor(() => {
	// 			expect(spy).toHaveBeenCalled();
	// 		});
	// 	});
	// });
});