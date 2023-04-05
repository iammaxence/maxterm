export type FileSystem = {
	type: 'File' | 'Folder',
	name: string,
}

export class FilesAndFoldersSystem {

	constructor(private files: string[], private folders: string[]){}

	static of(files: string[], folders: string[]): FilesAndFoldersSystem {
		return new FilesAndFoldersSystem(files, folders);
	}

	toFileSystem(): FileSystem[] {
		const fileSystems = [
			...this.files.map((file_name) => this.buildFileSystem('File', file_name)),
			...this.folders.map((folder_name) => this.buildFileSystem('Folder', folder_name))
		];

		return fileSystems.sort((a, b) => a.name.localeCompare(b.name));
	}

	buildFileSystem(type: 'File' | 'Folder', name: string): FileSystem {
		return { type, name };
	}
}