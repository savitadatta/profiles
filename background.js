chrome.runtime.onMessage.addListener((message) => {
    if (message.text) {
        console.log(message.text);
    }
});