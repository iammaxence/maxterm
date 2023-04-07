import { describe } from 'vitest';
import { mockIPC } from '@tauri-apps/api/mocks';
import { renderHook, waitFor } from '@testing-library/react';
import { useHomeHelper } from '../../../src/pages/home/HomeHelper';
import { randomFillSync } from 'crypto';
import { wait } from '@testing-library/user-event/dist/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
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
	
	it('Shoud fetch path of current dir', async () => {
		mockIPC((cmd, args) => {
			if(cmd === 'get_current_dir') {
				return Promise.resolve('/test');
			}
		});
		const { result } = renderHook(() => useHomeHelper());
		
		result.current.fetchCurrentDir();

		await waitFor(() => {
			expect(result.current.currentDir).toBe('/test');
		});

	});
});