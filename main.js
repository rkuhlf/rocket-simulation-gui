// I think that all of the data storage should be handled in the main section of electron.
// Every time the user makes a change and ten seconds have passed since the last change, write to a JSON file
// I like JSON because there is no reason to make the save format excessively hard to work with
// I have no idea how people program ctrl-z. Do they just store every single action and undo them one-by-one? Do you have to program it manually?


const { app, ipcMain, BrowserWindow } = require('electron')

const data = require('./mainJS/data')

function createWindow() {
    window = new BrowserWindow({
        show: false,
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    window.maximize()
    window.show()

    window.loadFile('./html/editorMenu.html')
}



app.on('ready', createWindow)


app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



data.main()















/*
const { spawn } = require('child_process');



//ipcMain.on will receive the “btnclick” info from renderprocess
ipcMain.on("btnclick", function (event, arg) {
    console.log('test from main')

    // I suspect that this is going to go poorly when I try to compile this for the end user
    // I believe that they will need to have python installed
    // Maybe I could do that thing where I just bundle my own installation of python with the app. Seems bloaty, but idk. python is about 108 MB. Rasaero is three megabytes. That is what we are aiming for. I think that python-shell should be able to do it without requiring any install
    // I think there is a way to compile python to .exe; I'll have to look into that
    // It should be reasonable, considering that I only need to read a file and write a file with the sim output
    // This is acceptable for now
    // TODO: get the finer details of more of this worked out, particularly with regard to electron compilation
    const ls = spawn('python', ["./runSimulation.py"]);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    // inform the render process that the assigned task finished. Show a message in html
    // event.sender.send in ipcMain will return the reply to renderprocess
    event.sender.send("btnclick-task-finished", "yes");
});


*/