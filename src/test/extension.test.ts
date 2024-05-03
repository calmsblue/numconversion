import * as assert from 'assert';
import * as sinon from 'sinon';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('inputNum', () =>{
		assert.strictEqual(myExtension.inputNum('20'), 20);
		assert.strictEqual(myExtension.inputNum('0x20'), 0x20);
		assert.strictEqual(myExtension.inputNum('0b10'), 0b10);
	});
});

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    
    suite('formatNum test suite', () => {
        test('Valid input: dec number 42', () => {
            const result = myExtension.formatNum(42);
            assert.strictEqual(result, '0x2a 42 0b101010');
        });
    
        test('Invalid input: NaN', () => {
            const result = myExtension.formatNum(NaN);
            assert.strictEqual(result, 'input error');
        });
    
        test('Valid input: hex number 0x1F', () => {
            const result = myExtension.formatNum(0x1F);
            assert.strictEqual(result, '0x1f 31 0b11111');
        });
    });

    suite('inputNum test suite', () => {
        test('Valid input: hex string "0x1A"', () => {
        // Arrange
        const input = "0x1A";
        // Act
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 26);
        });
    
        test('Valid input: bin string "0b1010"', () => {
        // Arrange
        const input = "0b1010";
        // Act
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 10);
        });
    
        test('Valid input: dec string "123"', () => {
        // Arrange
        const input = "123";
        // Act
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 123);
        });

        test('Invalid input: string ""', () => {
        // Arrange
        const input = "";
        // Act
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, NaN);
        });

        // TODO:この挙動でええんかいな
        test('Invalid input: string "-20"', () => {
        // Arrange
        const input = "-20";
        // Act
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, NaN);
        });
    });
});

suite('numconv test suite', () => {
    // test('Valid input: dec number 42', async () => {
    test('Valid input: hex string "0x1A"', () => {
        // 16進数テスト
        numconvCmpareTest('0x1A', 'result:0x1a 26 0b11010');
    });

    test('Valid input: bin string "0b1010"', () => {
        // 2進数テスト
        numconvCmpareTest('0b1010', 'result:0xa 10 0b1010');
    });

    test('Valid input: dec string "123"', () => {
        // 10進数テスト
        numconvCmpareTest('123', 'result:0x7b 123 0b1111011');
    });

    test('Invalid input: string ""', () => {
        // 文字列無効テスト
        numconvCmpareTest('', 'result:input error');
    });

    test('Invalid input: string "-20"', () => {
        // マイナス値無効テスト
        numconvCmpareTest('-20', 'result:input error');
    });

    async function numconvCmpareTest(actual:string, expected:string){
        // Arrange
        // スパイ化して、showInformationMessageが呼ばれたかどうかを確認する
        const showInformationMessageSpy = sinon.spy(vscode.window, 'showInformationMessage');
        // 仮のテキストドキュメントを作成
        const document = await vscode.workspace.openTextDocument({
            content: actual,
        });
        const editor = await vscode.window.showTextDocument(document);
        // テキストエディタで選択されたテキストを設定
        editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, actual.length));

        // Act
        await vscode.commands.executeCommand('numconversion.numconv');

        // Assert
        assert.strictEqual(showInformationMessageSpy.calledOnce, true); // showInformationMessage で表示されたメッセージ数を確認
        assert.strictEqual(showInformationMessageSpy.getCall(0).args[0], expected); // 正しいテキストが表示されたかを確認

        // スパイをリセット
        showInformationMessageSpy.restore();
    }
});