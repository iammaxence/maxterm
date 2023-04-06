import { describe, expect, it } from 'vitest';
import { FilesAndFoldersSystem } from '../../src/domain/FilesAndFoldersSystem';

describe('FilesAndFoldersSystem', () => {

	it('Should create FilesAndFoldersSystem', () => {
		expect(FilesAndFoldersSystem.of(['file1'], ['folder1']).toFileSystem())
			.toEqual([{ type: 'File', name: 'file1' }, { type: 'Folder', name: 'folder1' }]);
	});
});