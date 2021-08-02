
const lengthInput = document.getElementById('rocket-length');
lengthInput.addEventListener('input', updateValue => {
    const data = {
        // The key to the value
        "path": "body.length",
        "value": updateValue.target.value
    };


    //send the info to main process . we can pass any arguments as second param.
    ipcRenderer.send("rocket-update", JSON.stringify(data)); // ipcRender.send will pass the information to main process
});