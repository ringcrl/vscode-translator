// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import translator from './api';
import { window, ExtensionContext, commands } from 'vscode';
// const REVIEW_INTERVAL = 10 * 60 * 1000;
const REVIEW_INTERVAL = 5000;

async function showTranslateResult(srcText:string, translateText:string) {

  const selectedText = await window.showInformationMessage(
    `${srcText}\n${translateText}`,
    { modal: true },
    '加入生词库'
  );

  if (selectedText === '加入生词库') {
    const timer = setInterval(async () => {

      const selectedText = await window.showInformationMessage(
        srcText,
        { modal: false },
        '我已记住',
        '查看翻译'
      );

      if (selectedText === '我已记住') {
        clearTimeout(timer);
      } else if (selectedText === '查看翻译') {
        const srcTextLength = srcText.split(' ').length;
        let result:any;
        if (srcTextLength === 1) {
          result = await translator.getGoogleTranslateResult(srcText);
        } else {
          result = await translator.getSougouTranslateResult(srcText);
        }
        await window.showInformationMessage(
          result,
          { modal: false },
        );
      }
    }, REVIEW_INTERVAL);
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context:ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-translator" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand('extension.vscodeTranslate', async () => {
    // The code you place here will be executed every time your command is executed
    const editor = window.activeTextEditor;
    if (!editor) { return console.log('no open text editor!'); }
    const selection = editor.selection;

    let srcText = editor.document.getText(selection);
    if (!srcText) { return; }

    const srcTextLength = srcText.split(' ');
    let result:any;
    if (srcTextLength.length === 1) {
      result = await translator.getGoogleTranslateResult(srcText);
    } else {
      result = await translator.getSougouTranslateResult(srcText);
    }

    showTranslateResult(srcText, result);

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

