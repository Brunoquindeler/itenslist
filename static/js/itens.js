var listElement = document.querySelector('#list');
var inputElement = document.querySelector('#inputAdd');
var buttonElement = document.querySelector('#add');

var frutas = JSON.parse(localStorage.getItem('list_frutas')) || [];

function renderFrutas() {
    listElement.innerHTML = '';

    for (fruta of frutas) {
        var frutasElement = document.createElement('li')
        frutasElement.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center')
        frutasElement.style = "width: 100%; margin-bottom: 1%; margin-top: 1%;"
        var frutasText = document.createTextNode(fruta)
        frutasElement.appendChild(frutasText);
        
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('class', 'badge badge-danger badge-pill');
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);       
        
        var pos = frutas.indexOf(fruta);
        linkElement.setAttribute('onclick', 'deleteFruta(' + pos +')');

        listElement.appendChild(frutasElement);
        frutasElement.appendChild(linkElement);
    }
};

renderFrutas();

function addFrutas() {
    var frutasText = inputElement.value;

    if (frutasText == '' || frutasText.length > 20) {
        alert("Campo vazio ou muito grande...")
        inputElement.value = '';
    } else {
        frutas.push(frutasText);
        inputElement.value = '';
        renderFrutas();
        saveToStorage();
        console.log(frutasText.length)
    }
};

buttonElement.onclick = addFrutas;

function deleteFruta(pos) {
    frutas.splice(pos, 1);
    renderFrutas();
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('list_frutas', JSON.stringify(frutas))
}