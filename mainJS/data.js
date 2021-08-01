// Take care of storing all of the data




// Function to get a list of past rockets


// Function to load information from a past rocket


module.exports = {
    main: function () {
        const { ipcMain } = require('electron')

        currentSimulationSettings = {}

        // Only do this for the settings, the other stuff should be file writing outside the project
        const Store = require('electron-store');
        const store = new Store();

        // Function to get all of the necessary data and send it to the ipcRenderer. Probably will just have to do an ipcRenderer.send after the page loads in
        ipcMain.on("get-settings", function (event) {
            // event.sender.send in ipcMain will return the reply to renderprocess
            event.sender.send("retrieved-data", JSON.stringify(store.get("settings")));
        });


        // Function to accept the data for each of the inputs and buttons and update as they are being typed
        ipcMain.on("settings-update", function (event, arg) {
            arg = JSON.parse(arg)

            console.log(arg);

            store.set("settings." + arg.path, arg.value)

            // inform the render process that the assigned task finished. Show a message in html
            // event.sender.send in ipcMain will return the reply to renderprocess
            // TODO: I don't know if it is good practice to confirm every single communication between front end and back end
            // event.sender.send("btnclick-task-finished", "yes");
        });
    }
}



// Function to take the button data and incorporate it into the overall simulation settings


// Function to save the data


// Function to determine if the data should be saved now


// Function to tell the rendering side which sections have enough data