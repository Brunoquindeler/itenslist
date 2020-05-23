var listElement = document.querySelector('#list');
var inputElement = document.querySelector('#inputAdd');
var buttonElement = document.querySelector('#add');

var itens = JSON.parse(localStorage.getItem('list_itens')) || [];

function renderItens() {
    listElement.innerHTML = '';

    for (item of itens) {
        var itensElement = document.createElement('li')
        itensElement.setAttribute('class', 'list-group-item list-group-item-primary d-flex justify-content-between align-items-center')
        itensElement.style = "width: 100%; margin-bottom: 1%; margin-top: 1%;"
        var itensText = document.createTextNode(item)
        itensElement.appendChild(itensText);
        
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('class', 'badge badge-danger badge-pill');
        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);       
        
        var pos = itens.indexOf(item);
        linkElement.setAttribute('onclick', 'deleteItem(' + pos +')');

        listElement.appendChild(itensElement);
        itensElement.appendChild(linkElement);
    }
};

renderItens();

// Transforma texto em minusculo e primeira letra em maiúsculo
function transformText(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
};


function addItens() {
    // var itensText = inputElement.value.toLowerCase();
    var itensText = transformText(inputElement.value)

    var conteudo = itens.indexOf(itensText) != -1 ? 'True' : 'False';

    if (itensText == ''){
        alert("Campo vazio...");
        inputElement.value = '';
    } else if (itensText.length > 20) {
        alert("Palavra muito grande...");
        inputElement.value = '';
    } else if (conteudo == 'True') {
        alert("Item já existe...");
        inputElement.value = '';
    } else {
        itens.push(itensText);
        inputElement.value = '';
        itens.sort();
        renderItens();
        saveToStorage();
        console.log(itensText.length)
        console.log(itensText)
    }

    // if (itensText == '' || itensText.length > 20 || conteudo == 'True') {
    //     alert("Campo vazio, já existe ou muito grande...")
    //     inputElement.value = '';
    // } else {
    //     itens.push(itensText);
    //     inputElement.value = '';
    //     renderItens();
    //     saveToStorage();
    //     console.log(itensText.length)
    // }
};

buttonElement.onclick = addItens;

function deleteItem(pos) {
    itens.splice(pos, 1);
    renderItens();
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('list_itens', JSON.stringify(itens))
}

inputElement.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { // codigo da tecla enter
    addItens()
  }
});