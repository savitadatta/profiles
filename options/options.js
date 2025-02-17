// from https://web.archive.org/web/20170607022450/http://karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility/
function keyboardClick(event){
    if (event.type === 'keypress'){
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)){
            return true;
        }
    }
    return false;
}

document.getElementById("submit").addEventListener('keypress', (e) => {
    if (keyboardClick(e)) {
        submitForm("form");
    }
})
document.getElementById("submit").addEventListener('click', (e) => {
    submitForm("form");
})

document.getElementById("upload-file").addEventListener('change', (e) => {
    e.target.labels[0].innerText = e.target.files[0].name;
})

document.getElementById("submit-file").addEventListener('click', (e) => {
    console.log("clicked submit file");
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
    let fileInput = document.getElementById("upload-file");
    let [file] = fileInput.files;
    let reader = new FileReader();

    reader.addEventListener('load', () => {
        console.log(reader.result);
        let parsed = JSON.parse(reader.result);
        console.log(parsed);
    });

    if (file) {
        reader.readAsText(file);
    }
})

function getCheckedIds(nodelist, label=false) {
    return Array.prototype.filter.call(
        nodelist, function(item) { 
            return item.checked; 
    }).map((item) => {
        if (label) {
            return item.labels[0].innerText.trim();
        } else {
            return item.id;
        }
    });
}

function submitForm(id) {
    let form = document.getElementById(id);
    let elements = form.elements;
    let data = {};

    data.text1 = elements.text1.value;
    data.text2 = elements.text2.value;

    data.radio1 = getCheckedIds(elements.radio1, true);
    data.radio2 = getCheckedIds(elements.radio2, true);

    data.check1 = getCheckedIds(elements.check1, true);
    data.check2 = getCheckedIds(elements.check2, true);

    let result = JSON.stringify(data);
    console.log(result);
}