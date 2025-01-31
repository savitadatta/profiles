//##############################
//##########LISTENERS###########
//##############################

for (let button of document.querySelectorAll(".halved .button")) {
    button.addEventListener('click', () => {
        show(button);
    })
}

for (let button of document.querySelectorAll(".results .button")) {
    button.addEventListener('click', () => {
        toggle(button);
    })
}

//##############################
//####GLOBALS (change later)####
//##############################

let selected = [];

//##############################
//##########FUNCTIONS###########
//##############################

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
    console.log(obj.id + " clicked");
    if (selected.includes(obj.id)) {
        selected.pop(obj.id);
        console.log("unselected");
    } else {
        selected.push(obj.id);
        console.log("selected");
    }
    
    chrome.storage.local.set({ selected })
}