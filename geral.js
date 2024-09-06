var currTile;
var otherTile;

var turns = 0;
var imgOrder = []; 
var imgOrderCopy = [];

function game(rows, columns) {
    imgOrder = create_imgOrder(rows, columns);

    shuffle(imgOrder);

    imgOrderCopy = [...imgOrder];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + c.toString();
            tile.src = "img/" + imgOrder.shift() + ".jpg"; 
            console.log(tile.src);

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    
    while (currentIndex !== 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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

function atualizaLista(img1Id,index1,img2Id,index2){
    if(index1 !=-1){
        imgOrderCopy[index1] = img2Id;
    }
    if(index2 !=-1){
        imgOrderCopy[index2] = img1Id;
    }
}

function compareLists( ) {
    if (imgOrder.length !== imgOrderCopy.length) {
        return false;
    }

    for (let i = 0; i < imgOrderCopy.length; i++) {
        if (imgOrderCopy[i] !== imgOrder[i]) {
            return false;
        }
    }

    return true;
}

function resolvido(){
    if(ehIgual()){
        alert("resolvido :(");
    }
}

function play_audio() {
    let x = document.getElementById("audio");
    x.play();
}

function pause_audio() {
    let x = document.getElementById("audio");
    x.pause();
}

function dragStart() {
    currTile = this; 
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
    otherTile = this; 
}
function dragEnd() {
    if (!otherTile.src.includes("02.jpg")) { 
    }

    let currCoords = currTile.id.split(""); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

    let img1Id = r.toString() + c.toString();
    let img2Id = r2.toString() + c2.toString();
    
    let index1 = imgOrderCopy.indexOf(img1Id);
    let index2 = imgOrderCopy.indexOf(img2Id);
    
    imgOrderCopy = atualizaLista(img1Id,index1,img2Id,index2);

    resolvido();
}
