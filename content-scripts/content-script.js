function getContainer() {
    const body = document.body;
    const container = body.querySelector("article")
            || body.querySelector("*[id*='main]")
            || body.querySelector("*[id*='content']")
            || body.querySelector("*[class*='content']")
            || body;

    return container
}

function makeTextBig(container) {
    container.querySelectorAll("p, blockquote, h2, h3, h4, h5, h6").forEach((e) => {
        e.style.fontSize = "180%";
        e.style.lineHeight = 1.5;
    })

    container.querySelectorAll("li").forEach((e) => {
        if (e.querySelector("p")) {
            return;
        }
        
        e.style.fontSize = "180%";
        e.style.lineHeight = 1.5;
    })
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.request === "getBodyContainer") {
        let container = getContainer();
        makeTextBig(container);
    }
});