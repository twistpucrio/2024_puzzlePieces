var rows;
var columns;

var currTile;
var otherTile;

var turns = 0;
var imgOrder;
var rightOrder;
var lista; //Copia do imgOrder

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}


function arraysIguais() {
    if (lista.length !== rightOrder.length) {
        return false;
    }

    for (let i = 0; i < rightOrder.length; i++) {
        if (lista[i] !== rightOrder[i]) {
            return false;
        }
    }

    return true;
}

function resolvido() {

    if (arraysIguais()) {
        alert("resolveu... :(")
    }

}

function create_imgOrder(rows, columns) {
    let order = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            order.push(r.toString() + c.toString());
        }
    }

    return order;

}

function searchAndReplace(Item, index, newItem, index2) {

    if (index !== -1) {
        lista[index] = newItem;
    }

    if (index !== -1) {
        lista[index2] = Item;
    }

}

function game(rows, columns) {
    imgOrder = create_imgOrder(rows, columns);

    rightOrder = [...imgOrder];

    shuffle(imgOrder);


    lista = [...imgOrder];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            //<img id="00" src="1. ou webp">
            var tile = document.createElement("img");
            tile.id = r.toString() + c.toString();

            tile.src = "img/" + imgOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd.bind({ columns: columns }));      //after drag drop, swap the two tiles
            document.getElementById("board").append(tile);
        }
    }

}

/**************** BOTÕES DE PLAY E PAUSE **********************/

function play_audio() {
    let x = document.getElementById("audio");
    x.play();
}
function pause_audio() {
    let x = document.getElementById("audio");
    x.pause();
}

/*************************************************************/

/*********************** FUNÇÕES DO JOGO *********************/

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {

    let img = "0" + (this.columns - 1).toString();
    console.log(img);

    if (!otherTile.src.includes(img + ".jpg")) { //.jpg
        return;
    }

    let currCoords = currTile.id.split(""); //ex) "00" -> ["0", "0"]

    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);



    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

    let r1String = r.toString();
    let c1String = c.toString();
    let r2String = r2.toString();
    let c2String = c2.toString();

    let idImg1 = r1String + c1String;
    let idImg2 = r2String + c2String;

    var index1 = lista.indexOf(idImg1);
    var index2 = lista.indexOf(idImg2);


    searchAndReplace(idImg1, index1, idImg2, index2);

    resolvido();
}

/*************************************************************/
