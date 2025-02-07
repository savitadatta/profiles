document.getElementById("submit").addEventListener('click', () => {
    let form = document.getElementById("form");
    submitForm(form);
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

function submitForm(form) {
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