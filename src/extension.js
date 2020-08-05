const path = require("path");
const dateFormat = require("dateformat");
const fs = require("fs");
const vscode = require('vscode');

function activate(context) {

	//TODO: Add settings options for these constants
	// https://www.npmjs.com/package/dateformat#user-content-mask-options
	const dailyNoteMask = "dd-mm-yyyy";
	const weeklyNoteMask = "'week-'W-yyyy";
	const monthlyNoteMask = "mmmm-yyyy";
	const noteDirectory = "journal";
	const fileType = ".md";

	// Get workspace rootdir and eol
	const rootDirectory = vscode.workspace.workspaceFolders[0].uri.fsPath;
	const eol = vscode.workspace.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

	
	let daily = vscode.commands.registerCommand('repeating-notes.dailyNote', async function () {
		const currentDate = new Date();
		createNote(currentDate, dailyNoteMask);
	});

	let weekly = vscode.commands.registerCommand('repeating-notes.weeklyNote', async function () {
		const currentDate = new Date();
		createNote(currentDate, weeklyNoteMask);
	});

	let monthly = vscode.commands.registerCommand('repeating-notes.monthlyNote', async function () {
		const currentDate = new Date();
		createNote(currentDate, monthlyNoteMask);
	});

	async function createNote(date, mask) {

		const noteFileName = `${dateFormat(date, mask).toLowerCase()}${fileType}`;
	
		const filePath = path.join(rootDirectory, noteDirectory, noteFileName);

		if (await pathExists(filePath)) {

			// Show document
			const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
			await vscode.window.showTextDocument(document);

			return false;
		}

		await createDailyNoteDirectoryIfNotExists(filePath);

		await fs.promises.writeFile(
			filePath,
			`# ${dateFormat(date, mask)
				.replace(/^\w/, c => c.toUpperCase())
				.split("-").join(" ")
			}${eol}${eol}`
			);

		const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
		await vscode.window.showTextDocument(document);
		
		return true;
	
	}

	context.subscriptions.push(daily);
	context.subscriptions.push(weekly);
	context.subscriptions.push(monthly);

}

async function pathExists(path) {
	return fs.promises
	  .access(path, fs.constants.F_OK)
	  .then(() => true)
	  .catch(() => false);
  }


async function createDailyNoteDirectoryIfNotExists(dailyNotePath) {
	const dailyNoteDirectory = path.dirname(dailyNotePath);
  
	if (!(await pathExists(dailyNoteDirectory))) {
	  await fs.promises.mkdir(dailyNoteDirectory, { recursive: true });
	}
}



module.exports = {
	activate,
	pathExists,
	createDailyNoteDirectoryIfNotExists,

}
