// include the ipc module to communicate with main process.
const { ipcRenderer } = require('electron');


// On page load we are going to have to retrieve all of the past information from data.js
window.onload = () => {
    ipcRenderer.send("get-settings");
}


// Lots of button clicks to handle
const folderInput = document.getElementById('folder');
folderInput.addEventListener('input', updateValue => {
    const data = {
        // The key to the value
        "path": "folder",
        "value": updateValue.target.value
    };


    //send the info to main process . we can pass any arguments as second param.
    ipcRenderer.send("settings-update", JSON.stringify(data)); // ipcRender.send will pass the information to main process
});

const templateInput = document.getElementById('template');
templateInput.addEventListener('input', updateValue => {
    const data = {
        // The key to the value
        "path": "template",
        "value": updateValue.target.value
    };


    //send the info to main process . we can pass any arguments as second param.
    ipcRenderer.send("settings-update", JSON.stringify(data)); // ipcRender.send will pass the information to main process
});

ipcRenderer.on("retrieved-data", function (event, arg) {
    arg = JSON.parse(arg)

    const setValue = (element, value) => {
        // Otherwise it should be left at the default given in the pug code
        if (value != undefined) {
            element.value = value;
        }
    }

    setValue(folderInput, arg.folder);
    setValue(templateInput, arg.template);
});