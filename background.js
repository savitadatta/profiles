chrome.runtime.onMessage.addListener((msg) => {
    console.log(msg.text);
});
