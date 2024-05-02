import * as assert from 'assert';

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
	}
	)
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
        const input = "0x1A";
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 26);
        });
    
        test('Valid input: bin string "0b1010"', () => {
        const input = "0b1010";
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 10);
        });
    
        test('Valid input: dec string "123"', () => {
        const input = "123";
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, 123);
        });

        test('Invalid input: string ""', () => {
        const input = "";
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, NaN);
        });

        // TODO:この挙動でええんかいな
        test('Invalid input: string "-20"', () => {
        const input = "-20";
        const result = myExtension.inputNum(input);
        // Assert
        assert.strictEqual(result, NaN);
        });

    });
});