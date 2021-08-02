// Take care of storing all of the data

const fs = require('fs');
const path = require('path');

const { updateJSONDeep } = require('./helpers')


function getRocketBlurb(filePath) {
    const rocket = {};

    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    console.log('received data: ' + data);

    rocket.name = path.parse(filePath).name
    rocket.description = 'eventually I will be a sort summary of settings'



    return rocket;

}



const createObjectFromPath = (path, value, del = ".") => {
    const obj = {};

    let ref = obj

    path = path.split(del)

    path.forEach((element, index) => {
        if (index == path.length - 1) {
            ref[element] = value
        } else {
            ref[element] = {}
            ref = ref[element]
        }
    });


    return obj
}

// Function to save the data
const updateCurrentSimulation = (objectPath, value) => {
    // TODO: Implement a way of caching the data, probably just with an object, so that I don't have to read in the file each time

    const newInfo = createObjectFromPath(objectPath, value);

    // This is not defined
    updateJSONDeep(currentRocketPath, newInfo)
}



// Function to load information from a past rocket


module.exports = {
    main: function () {
        const { ipcMain } = require('electron')

        currentSimulationSettings = {}

        // Only do this for the settings, the other stuff should be file writing outside the project
        const Store = require('electron-store');

        // I need to figure out a way to get this schema to play nice with multiple nestings. Or not maybe

        store = new Store();

        // Function to get all of the necessary data and send it to the ipcRenderer. Probably will just have to do an ipcRenderer.send after the page loads in
        ipcMain.on("get-settings", function (event) {
            // event.sender.send in ipcMain will return the reply to renderprocess
            event.sender.send("retrieved-data", JSON.stringify(store.get("settings")));
        });


        // Function to accept the data for each of the inputs and buttons and update as they are being typed
        ipcMain.on("settings-update", function (event, arg) {
            arg = JSON.parse(arg)


            store.set("settings." + arg.path, arg.value)

            if (arg.path == "folder") {
                basePath = arg.path
            }

            // inform the render process that the assigned task finished. Show a message in html
            // event.sender.send in ipcMain will return the reply to renderprocess
            // TODO: I don't know if it is good practice to confirm every single communication between front end and back end
            // event.sender.send("btnclick-task-finished", "yes");
        });


        // Function to get a list of past rockets
        ipcMain.on("get-rockets", (event, arg) => {
            // Read the folder from settings
            const rocketsPath = store.get('settings.folder')

            const rockets = []
            console.log('reading', rocketsPath)

            try {
                const files = fs.readdirSync(rocketsPath);

                console.log("found files", files)
                files.forEach(file => {
                    const current = getRocketBlurb(path.join(rocketsPath, file))
                    console.log(current);
                    rockets.push(current);
                });
            } catch (err) {
                if (err.code === 'ENOENT') {
                    fs.mkdirSync(rocketsPath)
                } else {
                    throw err;
                }
            }

            event.sender.send("retrieved-rockets", rockets);

        });


        // Function to take the button data and incorporate it into the overall simulation settings
        ipcMain.on("rocket-update", function (event, arg) {
            arg = JSON.parse(arg)

            updateCurrentSimulation("rocket." + arg.path, arg.value)
        });
    },

    createObjectFromPath,
}







// Function to determine if the data should be saved now


// Function to tell the rendering side which sections have enough data