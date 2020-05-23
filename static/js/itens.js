var listElement = document.querySelector('#list');
var inputElement = document.querySelector('#inputAdd');
var buttonElement = document.querySelector('#add');

var items = JSON.parse(localStorage.getItem('list_items')) || [];

function renderItems() {
    listElement.innerHTML = '';

    for (item of items) {
        var itemsElement = document.createElement('li')
        itemsElement.setAttribute('class', 'list-group-item list-group-item-primary d-flex justify-content-between align-items-center')
        itemsElement.style = "width: 100%; margin-bottom: 1%; margin-top: 1%;"
        var itemsText = document.createTextNode(item)
        itemsElement.appendChild(itemsText);
        
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('class', 'badge badge-danger badge-pill');
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);       
        
        var pos = items.indexOf(item);
        linkElement.setAttribute('onclick', 'deleteItem(' + pos +')');

        listElement.appendChild(itemsElement);
        itemsElement.appendChild(linkElement);
    }
};

renderItems();

// Transforma texto em minusculo e primeira letra em maiúsculo
function transformText(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
};


function addItems() {
    // var itemsText = inputElement.value.toLowerCase();
    var itemsText = transformText(inputElement.value)

    var conteudo = items.indexOf(itemsText) != -1 ? 'True' : 'False';

    if (itemsText == ''){
        alert("Campo vazio...");
        inputElement.value = '';
    } else if (itemsText.length > 20) {
        alert("Palavra muito grande...");
        inputElement.value = '';
    } else if (conteudo == 'True') {
        alert("Item já existe...");
        inputElement.value = '';
    } else {
        items.push(itemsText);
        inputElement.value = '';
        items.sort();
        renderItems();
        saveToStorage();
        console.log(itemsText.length)
        console.log(itemsText)
    }

    // if (itemsText == '' || itemsText.length > 20 || conteudo == 'True') {
    //     alert("Campo vazio, já existe ou muito grande...")
    //     inputElement.value = '';
    // } else {
    //     items.push(itemsText);
    //     inputElement.value = '';
    //     renderItems();
    //     saveToStorage();
    //     console.log(itemsText.length)
    // }
};

buttonElement.onclick = addItems;

function deleteItem(pos) {
    items.splice(pos, 1);
    renderItems();
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('list_items', JSON.stringify(items))
}

inputElement.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { // codigo da tecla enter
    addItems()
  }
});