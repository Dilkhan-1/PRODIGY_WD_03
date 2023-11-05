let matrix = null;
let isXNext = true;
let isGameOver = false;
document.getElementById('restart').style.display = 'none';

function resetGame() {
    matrix = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    isXNext = true;
    isGameOver = false;

    const TIC_TAC_TOE = document.getElementById('tic_tac_toe');
    TIC_TAC_TOE.innerHTML = ''; // Clear the game board

    for (let i = 0; i < matrix.length; i++) {
        let temp = matrix[i];
        let outerBox = document.createElement('div');
        outerBox.setAttribute('class', 'box-outer');
        for (let j = 0; j < temp.length; j++) {
            let box = document.createElement('div');
            box.innerHTML = temp[j];
            box.setAttribute('class', `box box_${i}_${j}`);
            box.addEventListener('click', () => {
                handleBoxClick(i, j);
            });
            outerBox.appendChild(box);
        }
        TIC_TAC_TOE.appendChild(outerBox);
    }
    
    loadCurrentPlayer();

    document.getElementsByClassName('game_over')[0].style.display = 'none';
}

function stopTheGame() {
    let BOARD = document.getElementById('tic_tac_toe')
    BOARD.innerHTML = '';
    BOARD.classList = '';
    document.getElementsByClassName('current_player')[0].innerHTML = '';
    document.getElementById('new').style.display = 'block';
    document.getElementsByClassName('game_over')[0].style.display = 'block';
}

function drawStrikeLine(value) {
    document.getElementById('tic_tac_toe').classList.add(value);
}

function checkMatchActive() {
    const isGameDone = checkMatchOver();
    if (isGameDone) {
        let game_over_el = document.getElementsByClassName('game_over')[0];
        game_over_el.innerHTML = isGameDone;
        isGameOver = true;
        setTimeout(() => {
            stopTheGame();
        }, 1000);
    }
}

function handleBoxClick(i, j) {
    checkMatchActive();
    if (!isGameOver) {
        let data = matrix;
        if (isXNext) {
            if (!data[i][j]) {
                data[i][j] = 'X';
                document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'X';
                document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('x_class');
                isXNext = false;
                loadCurrentPlayer();
                setTimeout(() => {
                    checkMatchActive();
                }, 100);
            }
        } else {
            if (!data[i][j]) {
                data[i][j] = 'O';
                document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'O';
                document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('o_class');
                isXNext = true;
                loadCurrentPlayer();
                setTimeout(() => {
                    checkMatchActive();
                }, 100);
            }
        }
    }
}
function loadTheGame() {
    matrix = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    isXNext = true;
    isGameOver = false;

    document.getElementById('new').style.display = 'none';
    document.getElementById('restart').style.display = 'block';
    document.getElementsByClassName('game_over')[0].style.display = 'none';

    const TIC_TAC_TOE = document.getElementById('tic_tac_toe');
    for (let i = 0; i < matrix.length; i++) {
        let temp = matrix[i];
        let outerBox = document.createElement('div');
        outerBox.setAttribute('class', 'box-outer');
        for (let j = 0; j < temp.length; j++) {
            let box = document.createElement('div');
            box.innerHTML = temp[j];
            box.setAttribute('class', `box box_${i}_${j}`);
            box.addEventListener('click', () => {
                handleBoxClick(i, j);
            });
            outerBox.appendChild(box);
        }
        TIC_TAC_TOE.appendChild(outerBox);
    }
    loadCurrentPlayer();
}

function loadCurrentPlayer() {
    let el = document.getElementsByClassName('current_player')[0];
    el.innerHTML = isXNext ? 'X Turn' : 'O Turn';
}

function checkMatchOver() {

    // Horizontal Lines
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] && matrix[i][1] && matrix[i][2] && (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2])) {
            if (i === 0) {
                drawStrikeLine(`top_strike_${matrix[i][0]}`,);
            }
            if (i === 1) {
                drawStrikeLine(`middle_strike_${matrix[i][0]}`);
            }
            if (i === 2) {
                drawStrikeLine(`bottom_strike_${matrix[i][0]}`);
            }
            return matrix[i][1] + ' won!';
        }
    }

    // Verical Lines
    let arr0 = [];
    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < matrix.length; i++) {
        arr0.push(matrix[i][0]);
        arr1.push(matrix[i][1]);
        arr2.push(matrix[i][2]);
    }
    if (arr0.every(el => el === 'X') || arr0.every(el => el === 'O')) {
        drawStrikeLine(`left_vertical_strike_${arr0[0]}`);
        return arr0[0] + ' won!';
    }
    if (arr1.every(el => el === 'X') || arr1.every(el => el === 'O')) {
        drawStrikeLine(`middle_vertical_strike_${arr1[1]}`);
        return arr1[0] + ' won!';
    }
    if (arr2.every(el => el === 'X') || arr2.every(el => el === 'O')) {
        drawStrikeLine(`right_vertical_strike_${arr2[0]}`);
        return arr2[0] + ' won!';
    }

    // Left Digonal Line
    let arrCrossX = [];
    for (let i = 0; i < matrix.length; i++) {
        arrCrossX.push(matrix[i][i]);
    }

    if (arrCrossX.every(el => el === 'X') || arrCrossX.every(el => el === 'O')) {
        drawStrikeLine(`x_cross_strike_${arrCrossX[0]}`);
        return arrCrossX[0] + ' won!';
    }

    // Right Digonal Line
    let index = 2;
    let arrCrossY = [];
    for (let i = 0; i < matrix.length; i++) {
        arrCrossY.push(matrix[i][index]);
        --index;
    }
    if (arrCrossY.every(el => el === 'X') || arrCrossY.every(el => el === 'O')) {
        drawStrikeLine(`y_cross_strike_${arrCrossY[0]}`);
        return arrCrossY[0] + ' won!';
    }

    // Check for a draw condition
    let isDraw = true;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!matrix[i][j]) {
                isDraw = false;
                break;
            }
        }
    }
    if (isDraw) {
        return 'Its a Draw!';
    }
}

const restartButton = document.getElementById('reset');

// Add a hover effect to the "Restart" button
// Mouse enter (hover) effect
restartButton.addEventListener('mouseover', function() {
    restartButton.style.backgroundColor = '#66ff99'; //Green
});

// Mouse leave (hover out) effect
restartButton.addEventListener('mouseout', function() {
    restartButton.style.backgroundColor = 'snow';
});

const startButton = document.getElementById('start');

// Add a hover effect to the "Start" button
startButton.addEventListener('mouseenter', function() {
    // Mouse enter (hover) effect
    startButton.style.backgroundColor = '#02111B'; // Green
    startButton.style.color = 'snow';
});

startButton.addEventListener('mouseleave', function() {
    // Mouse leave (hover out) effect
    startButton.style.backgroundColor = 'snow';
    startButton.style.color = '#02111B';
});
