const rows = 10;
const cols = 10;
let row = 0;
let points = 0;
let maxPoints = 0;
const blockSize = 40;
const rowGenerated = [0,0,0,0,0,0,0,0,0,0];
const btnNewGame = document.getElementById('newGamebtn');
const scoreSpan = document.getElementById('scoreSpan');
let screen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
];

btnNewGame.addEventListener('click',()=>{
    location.reload();
});

function addBlocks(arreglo, from ,to){
    for (let i = 0; i < arreglo.length; i++) {
        rowGenerated[i] = Math.random() < 0.5 ? 0 : 1;  
    }
    const rowGeneratedCopy = rowGenerated.slice();
    const lastrow = arreglo[9].slice();
    arreglo.splice(from, 1);
    arreglo.splice(to, 0, rowGeneratedCopy);
    if(arreglo[arreglo.length -1].includes(1)){
        arreglo[9]=arreglo[8];
        drawScreen(arreglo);
        setTimeout(()=>{
            const message = 'Game Over\nTu puntaje es: ' + points + '.';
            alert(message);
        },0);
        return;
    }
    arreglo[9] = lastrow;
    drawScreen(screen);
    setTimeout(()=>{
        addBlocks(screen, 9, 0);
    }, 1000);
}

setTimeout(()=>{
    addBlocks(screen, 9, 0);
},0);

const gameScreen = document.getElementById('game-screen');

function drawScreen(screenrender) {
    gameScreen.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            //pixel.textContent='.';

            if (screenrender[i][j] === 1) {
                pixel.classList.add('block');
            } else if (screenrender[i][j] === 2) {
                pixel.classList.add(`ship`);
                pixel.id = 'ship';
            }
            gameScreen.appendChild(pixel);
        }
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        moveShipLeft();
    } else if (e.key === 'ArrowRight') {
        moveShipRight();
    }
});

function checkGameOver(){

}




//funcion para mover el bloque o ship a la izquierda
function moveShipLeft() {
    for (let i = 0; i < screen[9].length; i++) {
        if (screen[9][i] === 2) {
            if (screen[9][0] === 2) {
                return;
            }
            screen[9][i - 1] = 2;
            screen[9][i] = 0;
            drawScreen(screen);
            return;
        }
    }
}
//funcion para mover el bloque o ship a la derecha
function moveShipRight() {
    for (let i = 0; i < screen[9].length; i++) {
        if (screen[9][i] === 2) {
            if (screen[9][9] === 2) {
                return;
            }
            screen[9][i + 1] = 2;
            screen[9][i] = 0;
            drawScreen(screen);
            return;
        }
    }
}
document.addEventListener('keyup', e => {
    if (e.key === '1') {
        const newScreen = screen.map(subscreen => [...subscreen]);
        deleteBlock(newScreen);
    }
});

function deleteBlock(newScreenS){
    for (let i = 0; i < newScreenS[9].length; i++) {
        if (newScreenS[9][i] === 2) {
            console.log(`Posicion de la nave en el bloque: ${i+1}`);
            //recorrer en forma inversa el arreglo bidimensional
            for (let j = newScreenS.length -1; j >= 0; j--) {
                for (let k = newScreenS[j].length -1; k >= 0; k--) {
                    if ((newScreenS[j][k] + newScreenS[9][k]) === 3) {

                        points += 50;
                        scoreSpan.textContent = points;
                        newScreenS[j][k] = 0;
                        screen = newScreenS.map(subscreen => [...subscreen]);
                        drawScreen(screen);
                        console.log(points);
                        console.log(`posicion nave: ${i} y posicion bloque: fila:${j}, columna: ${k}`);
                        return newScreenS;
                    }
                }  
            }
        }
    }
}
