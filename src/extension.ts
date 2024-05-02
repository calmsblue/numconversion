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
			const num = inputNum(value);
			outputNum(num);
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

function isDecimal(hexString: string): boolean {
    return /^\d*$/i.test(hexString);
}
function inputNum(input: string):number{
	if(hasLeading0x(input)){
		// 入力が16進数の場合
		return parseInt(input.slice(2),16);
	}
	else if(hasLeading0b(input)){
		// 入力が2進数の場合
		return parseInt(input.slice(2),2);
	}
	else if(isDecimal(input)){
		// 入力が10進数の場合
		return parseInt(input);
	}
	else {
		// それ以外の場合(NaN)
		return NaN;
	}
}

function outputNum(inputnum: number) {
	// if (isNaN(inputnum)){
	// 	vscode.window.showInformationMessage('result: input error');
	// 	return;
	// }
	// const outputtxt = '0x' + inputnum.toString(16) + ' ' + inputnum.toString(10) + " 0b" + inputnum.toString(2);
	const outputtxt = formatNum(inputnum);
	vscode.window.showInformationMessage('result:' + outputtxt);
}

function formatNum(inputnum: number) {
	let outputtxt : string;
	if (isNaN(inputnum)){
		outputtxt = 'input error';
		return outputtxt;
	}
	outputtxt = '0x' + inputnum.toString(16) + ' ' + inputnum.toString(10) + " 0b" + inputnum.toString(2);
	return outputtxt;
}
// This method is called when your extension is deactivated
export function deactivate() {}
