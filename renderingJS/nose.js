// When you go to a page, it should automatically log all of the defaults as rocket settings

const { ipcRenderer } = require('electron')

const diameterInput = document.getElementById('diameter');
diameterInput.addEventListener('input', updateValue => {
    const data = {
        // The key to the value
        "path": "nose.diameter",
        "value": updateValue.target.value
    };


    ipcRenderer.send("rocket-update", JSON.stringify(data));
});