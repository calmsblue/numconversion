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
		if(typeof value === "string"){
			const num = inputNum(value);
			outputNum(num);
		}
	});

	let numconv = vscode.commands.registerCommand('numconversion.numconv', async () => {
		// 選択情報を取得
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return; // 編集中のテキストエディタがない場合は処理を終了
        }
        let selection = editor.selection;
        let value = editor.document.getText(selection);

		// 文字列が入力されている場合
		if(typeof value === "string"){
			const num = inputNum(value);
			outputNum(num);
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(numconv);
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

export function inputNum(input: string):number{
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

// 変換結果を出力する
function outputNum(inputnum: number) {
	// 出力文字列を取得
	const outputtxt = formatNum(inputnum);
	// 右下からポップアップ
	vscode.window.showInformationMessage('result:' + outputtxt);
}

// 入力値を出力用にフォーマットする
export function formatNum(inputnum: number) {
	let outputtxt : string;
	// 入力値不正？
	if (isNaN(inputnum)){
		outputtxt = 'input error';
		return outputtxt;
	}

	outputtxt = '0x' + inputnum.toString(16) + ' ' + inputnum.toString(10) + " 0b" + inputnum.toString(2);
	return outputtxt;
}

// This method is called when your extension is deactivated
export function deactivate() {}
