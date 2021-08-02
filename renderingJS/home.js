// Deal with complex add button

// Drop down code


const { ipcRenderer } = require('electron');


const rocketList = document.querySelector('.rocket-list');

window.onload = () => {
    ipcRenderer.send("get-rockets");
}

// This really does not work as well as it should with pug
// I suppose this is the thing that React is really good at
function createRocketItem(name, description) {
    // Also needs to be a link
    // Also need to add a few classes to style it
    let div = document.createElement('div');

    let title = document.createElement("h4");
    title.textContent = name;
    div.appendChild(title);

    let subtitle = document.createElement("span");
    subtitle.textContent = description;
    div.appendChild(subtitle);


    return div;
}

ipcRenderer.on("retrieved-rockets", (event, arg) => {
    console.log(arg);
    // TODO: It is at this point that I discovered that electron's ipc system can handle more than strings. I should refactor everything to get rid of the unnecessary JSON.parse & stringifies
    // try {
    //     arg = JSON.parse(arg);
    // } catch {
    //     return;
    // }

    arg.forEach(element => {
        const toAdd = createRocketItem(element.name, element.description);
        rocketList.appendChild(toAdd);
    });
});




const nameInput = document.querySelector('.name-input');


const submitNameButton = document.querySelector('.submit-name')


submitNameButton.addEventListener('click', () => {
    const name = nameInput.value;

    console.log(name, "created")

    ipcRenderer.send('create-rocket', name);
});
