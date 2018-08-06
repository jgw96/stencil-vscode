'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { exec, ChildProcess } from 'child_process';

let startExec: ChildProcess;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "stencil" is now active!');

  const disposable = vscode.commands.registerCommand('extension.stencilStart', () => {
    vscode.window.showInformationMessage('Running stencil build --dev --watch --serve');

    startExec = exec('npx stencil build --dev --watch --serve', { cwd: vscode.workspace.rootPath }, (err: Error, stdout: string, stderr: string) => {
      if (err) {
        vscode.window.showErrorMessage(err.toString());
        console.error(err);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

  const buildDisposable = vscode.commands.registerCommand('extension.stencilBuild', () => {
    vscode.window.showInformationMessage('Running stencil build');

    exec('npx stencil build', { cwd: vscode.workspace.rootPath }, (err: Error, stdout: string, stderr: string) => {
      if (err) {
        vscode.window.showErrorMessage(err.toString());
        console.error(err);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

  context.subscriptions.push(disposable, buildDisposable);
}

export function deactivate() {
  startExec.kill();
}