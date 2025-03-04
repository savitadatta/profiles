//////////////////////////////////
////////////LISTENERS/////////////
//////////////////////////////////

for (let button of document.querySelectorAll(".halved .button")) {
    button.addEventListener('click', () => {
        if (button.id === 'options') {
            window.open('../options/options.html', '_blank').focus();
        } else {
            show(button);
        }
    })
}

for (let button of document.querySelectorAll(".results .button")) {
    // these are all labels for checkboxes;
    // the input is directly before each one
    if (['reader', 'undo'].includes(button.id)) {
        button.addEventListener('click', () => {
            toggle(button.previousElementSibling);
        })
    }
}

document.getElementById('reader').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0]?.id,
            { request: "bigText" }
        );
    });
})

document.getElementById('undo').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0]?.id,
            { request: "undo" }
        );
    });
})

//////////////////////////////////
//////GLOBALS (change later)//////
//////////////////////////////////

let selected = [];

//////////////////////////////////
//////////////SETUP///////////////
//////////////////////////////////

chrome.storage.sync.get("features", (data) => {
    if (data.features) {
        selected = data.features;
        updateSelectedFeatures(selected);
    }
})

//////////////////////////////////
////////////FUNCTIONS/////////////
//////////////////////////////////

function show(obj) {
    id = obj.id;
    for (let button of document.querySelectorAll(".results .button")) {
        if (!button.className.includes(" " + id)) {
            button.style.display = "none";
        } else {
            button.style.display = "";
        }
    }
}

function toggle(obj) {
    if (selected.includes(obj.id)) {
        selected.pop(obj.id);
    } else {
        selected.push(obj.id);
    }
    
    chrome.storage.sync.set({ features : selected });
}

function updateSelectedFeatures(selected) {
    for (let input of document.getElementsByTagName("input")) {
        if (input.type == "checkbox") {
            if (selected.includes(input.id)) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        }
    }
}