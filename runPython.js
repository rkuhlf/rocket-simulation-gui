// include the ipc module to communicate with main process.
const ipcRenderer = require('electron').ipcRenderer;

const btnclick = document.getElementById('test');
btnclick.addEventListener('click', () => {
    console.log('test')
    var arg = "secondparam";

    //send the info to main process . we can pass any arguments as second param.
    ipcRenderer.send("btnclick", arg); // ipcRender.send will pass the information to main process
});