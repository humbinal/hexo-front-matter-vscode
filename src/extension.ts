// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as moment from 'moment';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hexo-fromt-matter" is now active, and it only work in text editor mode.');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerTextEditorCommand('extension.hexoFromtMatter', (textEditor, edit) => {
        // The code you place here will be executed every time your command is executed
        console.log('hexo-fromt-matter TextEditorCommand toggle...');

        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        const id = moment(date).format('X');

        let fileName = textEditor.document.fileName;
        let pos = fileName.lastIndexOf(".");
        let fileTitle = fileName.substring(0, pos === -1 ? fileName.length : pos)
        console.log("fileTitle:", fileTitle);
        let result = `---
title: ${fileTitle}
date: ${date}
id: ${id}
tags:
  - untagged
categories:
  - uncategorized
keywords: keyword1,keyword2
description: description
---\n`
        textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), result);
        });

        // Display a status bar message to the user
        vscode.window.setStatusBarMessage('hexo front matter added for ' + fileName, 4000);
    });

    context.subscriptions.push(disposable);
}
