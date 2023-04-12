# maxterm

/!\ In developpement /!\

![maxterm-screenshot](https://user-images.githubusercontent.com/32987179/229206120-b1ab9e82-81e4-4584-8138-b4f81d5b9b67.png)

## Structure

### Object from terminal

[
	{
		id: number,
		time: string
		prompt: { path: string, command: string }
		result: FileSystem[]
	}
]


## Board

- Add linter.
- Add vitest

### Feature

- Add "cd .." to go back to previous folder path.
- Handle error when user enter wrong informations for a command.

### Refactoring

- Make a better structure to retrieve result from commands.
- Make test for HomeHelper.
- Choose an other color for commands that has been typed.

### Fix