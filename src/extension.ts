// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "numconversion" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('numconversion.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// 引数を取る
		const value = await vscode.window.showInputBox({
			prompt: '引数を入力してください',
			placeHolder: '例: hello world'
		});

		// 文字列が入力されている場合
		if(typeof value == "string"){
			const num = inputnum(value);
			output(num);
		}
	});


	context.subscriptions.push(disposable);
}

function hasLeading0x(hexString: string): boolean {
    return /^0x/i.test(hexString);
}

function hasLeading0b(hexString: string): boolean {
    return /^0b/i.test(hexString);
}

function inputnum(input: string):number{
	if(hasLeading0x(input)){
		// 入力が16進数の場合
		return parseInt(input.slice(2),16);
	}
	else if(hasLeading0b(input)){
		// 入力が2進数の場合
		return parseInt(input.slice(2),2);
	}
	else {
		// それ以外の場合(数値変換できない場合はNaN)
		return parseInt(input);
	}
}

function output(inputnum: number) {
	const outputtxt = '0x' + inputnum.toString(16) + ' ' + inputnum.toString(10) + " 0b" + inputnum.toString(2);
	vscode.window.showInformationMessage('result:' + outputtxt);
}
// This method is called when your extension is deactivated
export function deactivate() {}
