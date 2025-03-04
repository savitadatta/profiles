function getContainer() {
    const body = document.body;
    const container = body.querySelector("article")
            || body.querySelector("*[id*='main']")
            || body.querySelector("*[id*='Main']")
            || body.querySelector("*[id*='content']")
            || body.querySelector("*[id*='Content']")
            || body.querySelector("*[class*='main']")
            || body.querySelector("*[class*='Main']")
            || body.querySelector("*[class*='content']")
            || body.querySelector("*[class*='Content']")
            || body;

    return container
}

function makeTextBig(container) {
    container.querySelectorAll("p, h2, h3, h4, h5, h6, table").forEach((e) => {
        e.style.fontSize = "180%";
        e.style.lineHeight = 1.5;
    })

    // container.querySelectorAll("p").forEach((e) => {
    //     e.style.fontWeight = "bold";
    // })

    container.querySelectorAll("li, blockquote").forEach((e) => {
        if (e.querySelector("p") || e.querySelector("li")) {
            return;
        }
        
        e.style.fontSize = "180%";
        e.style.lineHeight = 1.5;
    })
}

function undoStyle(container) {
    container.querySelectorAll("p, blockquote, h2, h3, h4, h5, h6, li").forEach((e) => {
        e.style = {};
    })
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.request === "bigText") {
        let container = getContainer();
        chrome.runtime.sendMessage({
            text: container.className
        })
        makeTextBig(container);
    } else if (msg.request === "undo") {
        let container = getContainer();
        undoStyle(container);
    }
});