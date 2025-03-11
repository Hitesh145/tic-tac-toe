// creating a local storage for score record 
let score = {
    PLAYER_1: 0,
    PLAYER_2: 0,
    DRAWS: 0
}
let sc = JSON.parse(localStorage.getItem('score'));
if (sc) {
    score = sc;
}


function updateScore() {
    console.log(score);
    document.querySelector(".game-score").innerHTML = `Player 1 : ${score.PLAYER_1}, Player 2 : ${score.PLAYER_2}, Draws : ${score.DRAWS}`;
}


function updateScore() {
    document.querySelector(".game-score").innerHTML = `Player 1 : ${score.PLAYER_1}, Player 2 : ${score.PLAYER_2}, Draws : ${score.DRAWS}`;
}

updateScore();



var container = document.querySelector(".container");
let board = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

// function to increase the score of the player
function scoreinc(p) {
    if (p === 0) {
        score.PLAYER_1 = score.PLAYER_1 + 1;
        localStorage.setItem('score', JSON.stringify(score));
    }
    else {
        score.PLAYER_2 = score.PLAYER_2 + 1;
        localStorage.setItem('score', JSON.stringify(score));
    }
}

// function to check the diagonal win
function diagWin(p) {
    return (board[0][0] === board[2][2] && board[0][0] === board[1][1]) || (board[2][0] === board[0][2] && board[2][0] === board[1][1]);
}

// function to change the turn of the player
function turn(p) {
    return p === 0 ? 1 : 0;
}

// function to check the row win
function rowWin(r) {
    return board[r][0] === board[r][1] && board[r][1] === board[r][2];
}

// function to check the column win
function colWin(c) {
    return board[0][c] === board[1][c] && board[1][c] === board[2][c];
}

gameon = true
let p = 0;
let t = 0;

// function to start the game
function game(r, c) {

    let row = r - 1;
    let col = c - 1;

    board[row][col] = p;


    if (board[1][1] !== -1 && (row === col || row + col === 2)) {
        if (diagWin(p)) {
            gameon = false;
            let txt = document.querySelector(".winner");
            txt.innerHTML = `Player ${p + 1} wins`;
            scoreinc(p);
            updateScore(score);
            container.appendChild(txt);
        }
    }

    if (t > 3) {
        if (rowWin(row) || colWin(col)) {
            gameon = false;
            let txt = document.querySelector(".winner");
            txt.innerHTML = `Player ${p + 1} wins`;
            scoreinc(p);
            updateScore(score);
            container.appendChild(txt);
        }
    }

    p = turn(p);


    t++;
    if (t === 9 && gameon) {
        let txt = document.querySelector(".winner");
        txt.innerHTML = "It's a draw ";
        gameon = false;
        score.DRAWS++;
        localStorage.setItem('score', JSON.stringify(score));
        updateScore(score);
        container.appendChild(txt);
    }
}

function putsign(x) {
    let player = x;
    if (player == 0) {

        return "X";
    } else {

        return "O";
    }

}



document.querySelector(".container").addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        let row = e.target.getAttribute("row");
        let col = e.target.getAttribute("col");

        console.log(gameon);
        if (gameon) {

            game(row, col);
            e.target.innerHTML = putsign(p);
            e.target.disabled = true;
            let coler = p === 0 ? "red" : "blue";
            e.target.style.color = coler;
        }
    }
}
);


// function to reset the game board
function reset() {
    board = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    p = 0;
    t = 0;
    gameon = true;
    let buttons = document.querySelectorAll(".btn");
    for (let button of buttons) {
        button.innerHTML = "";
        button.disabled = false;
    }
    document.querySelector(".winner").innerHTML = "";
}
