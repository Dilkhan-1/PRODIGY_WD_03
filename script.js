function TicTacToe(placeholder, grid_size, callback) {
    // Save the placeholder element 
    this.placeholder = placeholder;
    // Paint the placeholder with board
    this.paint(grid_size);
    // Save the callback
    this.callback = callback;
    // Save player scores
    this.scores = {
        X: 0,
        O: 0
    };
    this.marks = {
        X: "X",  // Player 1 mark
        O: "O",  // Player 2 mark
        count: 0 // Number of moves made by player
    };
    return this;
}
TicTacToe.prototype.paint = function(grid_size) {
    var self = this;
    // Get number of columns, considering board as N x N board (3 x 3)
    self.grid_size = grid_size;
    var html = '<table id="tic-tac-toe" align="center">';
    
    for(var i = 0; i < grid_size; i++) {
        html += '<tr>';
        for(var j = 0; j < grid_size; j++) {
            html+= '<td></td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    
    self.placeholder.innerHTML = html;
    // Find all columns from the board
    self.columns = self.placeholder.getElementsByTagName("td");
    // Go through all the columns and add click event
    for(i = 0; i < this.columns.length; i++) {
        self.columns[i].addEventListener("click", markHandler);
    }
    // on click mark the column "<td>"
    function markHandler(e) {
        self.mark(e.target);
    }
};
TicTacToe.prototype.mark = function(column) {
    // Stop if column is not empty
    if(column.innerHTML) {
        return;
    }
    // Count the move
    this.marks.count++;
    // Get the mark based on the count
    var current_mark = this.marks.count % 2 === 1 ? this.marks.X : this.marks.O;
    // Fill the column with mark
    column.innerHTML = current_mark;
    column.classList.add(current_mark);
    // Check if this player (X or O) won
    if(this.didWin(current_mark)) {
        // Increment the player score
        if(this.marks.count % 2 === 1) {
            this.scores.X++;
        } else {
            this.scores.O++;
        }
        // Send current mark and scores
        this.callback(current_mark, this.scores);
    } else if(this.marks.count === this.columns.length) {
        // Send result as draw
        this.callback("draw");
    }
};
//  Board:
//  _____________
//    | 0 | 1 | 2 |
//  |---|---|---|
//  | 3 | 4 | 5 |
//    |---|---|---|
//    | 6 | 7 | 8 |
//  -------------
// 
// We need to go through all columns like
// 
// 012, 345, 678 - Horizontal
// 036, 147, 258 - Vertical
// 048, 246      - Diagonal
//
// If mark is present in all columns of any combinations then user won
//
// Instead of going through each combination manually we can make use of loops,
// So that it can be used for any grids like 7 X 7
//
TicTacToe.prototype.didWin = function(mark) {
    // Take count of columns
    var grid_size = this.grid_size;
    // Declare variables to count the presence of the mark
    var horizontal_count,
        vertical_count,
        right_to_left_count = 0,
        left_to_right_count = 0;
    // Loop 1
    for(var i = 0; i < grid_size; i++) {
        // Empty the count
        horizontal_count = vertical_count = 0;
        // Loop 2
        for(var j = 0; j < grid_size; j++) {
            // i * grid_size + j ===> "0,1,2", "3,4,5", "6,7,8"
            if(this.columns[i * grid_size + j].innerHTML == mark) {
                horizontal_count++;
            }
            // j * grid_size + i ===> "0,3,6", "1,4,7", "2,5,8"
            if(this.columns[j * grid_size + i].innerHTML == mark) {
                vertical_count++;
            }
        }
        // If horizontal or vertical combination is found the return true
        if(horizontal_count == grid_size || vertical_count == grid_size) {
            return true;    
        }
        // i * grid_size + i ===> "0,4,8"
        if(this.columns[i * grid_size + i].innerHTML == mark) {
            right_to_left_count++;
        }
        // (grid_size - 1) * (i+1) ===> "2,4,6"
        if(this.columns[(grid_size - 1) * (i+1)].innerHTML == mark) {
            left_to_right_count++;
        }
    } // End of loop
    // If mark is present diagnolly
    if(right_to_left_count == grid_size || left_to_right_count == grid_size) {
        return true;    
    }
    return false;
};
TicTacToe.prototype.empty = function() {
    // Go through all columns and empty them
    for(var i = 0; i < this.columns.length; i++) {
        this.columns[i].innerHTML = '';
        this.columns[i].classList.remove(this.marks.X);
        this.columns[i].classList.remove(this.marks.O);
    }
    // Reset the count
    this.marks.count = 0;
};
TicTacToe.prototype.reset = function() {
    this.empty();
    this.scores = {
        X: 0,
        O: 0
    };
};
var placeholder = document.getElementById("placeholder");
var tictactoe = new TicTacToe(placeholder, 3, onResult);
function onResult(result, scores) {
    if(result == 'draw') {
        alert("It's a draw !");
    } else {
        alert(result + " has won");
        updateScores(scores.X, scores.O);
    }
    tictactoe.empty();
}
function updateScores(X, O) {
    document.querySelector("#scoreboard #player1").innerHTML = X;
    document.querySelector("#scoreboard #player2").innerHTML = O;    
}
function restart(grid_size) {
    tictactoe.reset();
    updateScores(0, 0);
    if(grid_size) {
        tictactoe.paint(grid_size);
    }
}

// let matrix = null;
// let isXNext = true;
// let isGameOver = false;

// function stopTheGame() {
//     let BOARD = document.getElementById('tic_tac_toe')
//     BOARD.innerHTML = '';
//     BOARD.classList = '';
//     document.getElementsByClassName('current_player')[0].innerHTML = '';
//     document.getElementById('restart').style.display = 'block';
//     document.getElementsByClassName('game_over')[0].style.display = 'block';
// }

// function drawStrikeLine(value) {
//     document.getElementById('tic_tac_toe').classList.add(value);
// }

// function checkMatchActive() {
//     const isGameDone = checkMatchOver();
//     if (isGameDone) {
//         let game_over_el = document.getElementsByClassName('game_over')[0];
//         game_over_el.innerHTML = isGameDone;
//         isGameOver = true;
//         setTimeout(() => {
//             stopTheGame();
//         }, 2000);
//     }
// }

// function handleBoxClick(i, j) {
//     checkMatchActive();
//     if (!isGameOver) {
//         let data = matrix;
//         if (isXNext) {
//             if (!data[i][j]) {
//                 data[i][j] = 'X';
//                 document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'X';
//                 document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('x_class');
//                 isXNext = false;
//                 loadCurrentPlayer();
//                 setTimeout(() => {
//                     checkMatchActive();
//                 }, 100);
//             }
//         } else {
//             if (!data[i][j]) {
//                 data[i][j] = 'O';
//                 document.getElementsByClassName(`box_${i}_${j}`)[0].innerHTML = 'O';
//                 document.getElementsByClassName(`box_${i}_${j}`)[0].classList.add('o_class');
//                 isXNext = true;
//                 loadCurrentPlayer();
//                 setTimeout(() => {
//                     checkMatchActive();
//                 }, 100);
//             }
//         }
//     }
// }
// function loadTheGame() {
//     matrix = [
//         ['', '', ''],
//         ['', '', ''],
//         ['', '', '']
//     ];
//     isXNext = true;
//     isGameOver = false;
//     document.getElementById('restart').style.display = 'none';
//     document.getElementById('restart').style.display = 'none';
//     document.getElementsByClassName('game_over')[0].style.display = 'none';
//     const TIC_TAC_TOE = document.getElementById('tic_tac_toe');
//     for (let i = 0; i < matrix.length; i++) {
//         let temp = matrix[i];
//         let outerBox = document.createElement('div');
//         outerBox.setAttribute('class', 'box-outer');
//         for (let j = 0; j < temp.length; j++) {
//             let box = document.createElement('div');
//             box.innerHTML = temp[j];
//             box.setAttribute('class', `box box_${i}_${j}`);
//             box.addEventListener('click', () => {
//                 handleBoxClick(i, j);
//             });
//             outerBox.appendChild(box);
//         }
//         TIC_TAC_TOE.appendChild(outerBox);
//     }
//     loadCurrentPlayer();
// }

// function loadCurrentPlayer() {
//     let el = document.getElementsByClassName('current_player')[0];
//     el.innerHTML = isXNext ? 'X' : 'O';
// }

// function checkMatchOver() {
//     for (let i = 0; i < matrix.length; i++) {
//         if (matrix[i][0] && matrix[i][1] && matrix[i][2] && (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2])) {
//             if (i === 0) {
//                 drawStrikeLine(`top_strike_${matrix[i][0]}`,);
//             }
//             if (i === 1) {
//                 drawStrikeLine(`middle_strike_${matrix[i][0]}`);
//             }
//             if (i === 2) {
//                 drawStrikeLine(`bottom_strike_${matrix[i][0]}`);
//             }
//             return matrix[i][1] + ' won!';
//         }
//     }
//     let arr0 = [];
//     let arr1 = [];
//     let arr2 = [];
//     for (let i = 0; i < matrix.length; i++) {
//         arr0.push(matrix[i][0]);
//         arr1.push(matrix[i][1]);
//         arr2.push(matrix[i][2]);
//     }
//     if (arr0.every(el => el === 'X') || arr0.every(el => el === 'O')) {
//         drawStrikeLine(`left_vertical_strike_${arr0[0]}`);
//         return arr0[0] + ' won!';
//     }
//     if (arr1.every(el => el === 'X') || arr1.every(el => el === 'O')) {
//         drawStrikeLine(`middle_vertical_strike_${arr1[1]}`);
//         return arr1[0] + ' won!';
//     }
//     if (arr2.every(el => el === 'X') || arr2.every(el => el === 'O')) {
//         drawStrikeLine(`right_vertical_strike_${arr2[0]}`);
//         return arr2[0] + ' won!';
//     }

//     let arrCrossX = [];
//     for (let i = 0; i < matrix.length; i++) {
//         arrCrossX.push(matrix[i][i]);
//     }
//     if (arrCrossX.every(el => el === 'X') || arrCrossX.every(el => el === 'O')) {
//         drawStrikeLine(`x_cross_strike_${arrCrossX[0]}`);
//         return arrCrossX[0] + ' won!';
//     }

//     let index = 2;
//     let arrCrossY = [];
//     for (let i = 0; i < matrix.length; i++) {
//         arrCrossY.push(matrix[i][index]);
//         --index;
//     }
//     if (arrCrossY.every(el => el === 'X') || arrCrossY.every(el => el === 'O')) {
//         drawStrikeLine(`y_cross_strike_${arrCrossY[0]}`);
//         return arrCrossY[0] + ' is the winner';
//     }
// }