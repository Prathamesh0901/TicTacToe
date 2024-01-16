let inputs = document.querySelectorAll('.js-input');
let reset = document.querySelector('.js-reset-game-button');
let turn = document.querySelector('.js-turn');

let turnO = true;
let winner = '';
let turns = 0;

let points = JSON.parse(localStorage.getItem('points'));

if(!points){
    points = {
        oWins: 0,
        xWins: 0,
        ties: 0
    };
}

displayPoints();

let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

inputs.forEach((input) => {
    input.addEventListener('click', () => {
        if(turnO){
            turns++;
            input.innerText = 'O';
            turnO = false;
            turn.innerText = `X's Turn`;
        }
        else{
            turns++;
            input.innerText = 'X';
            turnO = true;
            turn.innerText = `O's Turn`;
        }
        input.disabled = true;
        checkWinner();
        if(turns === 9 && !winner){
            points.ties += 1;
            displayPoints();
            displayWinner();
            updateScore();
            reset.innerText = 'New Game';
        }
    });
});

function checkWinner() {
    winningPatterns.forEach((pattern) => {
        if(!winner){
            let pos1 = inputs[pattern[0]].innerText;
            let pos2 = inputs[pattern[1]].innerText;
            let pos3 = inputs[pattern[2]].innerText;
            if(pos1 !== '' && pos2 !== '' && pos3 !== ''){
                if(pos1 === pos2 && pos2 === pos3){
                    winner = pos1;
                    updateScore();
                    displayPoints();
                    displayWinner();
                    disableAll();
                    reset.innerText = 'New Game';
                }
            }
        }
    });
};

function displayWinner(){
    if(winner){
        document.querySelector('.js-display-winner').innerHTML = `${winner} wins!!!`;
    }
    else{
        document.querySelector('.js-display-winner').innerHTML = `Tie`;
    }
}

function disableAll(){
    inputs.forEach((input) => {
        input.disabled = true;
    });
};

reset.addEventListener('click', () => {
    resetGame();
})

function resetGame(){
    turns = 0;
    turnO = true;
    for(let input of inputs){
        input.innerText = '';
        input.disabled = false;
    }
    winner = '';
    reset.innerText = 'Reset Game';
    document.querySelector('.js-display-winner').innerHTML = ``;
    turn.innerText = `O's Turn`;
}

function updateScore(){
    if(winner === 'X'){
        points.xWins += 1;
    }
    else if(winner === 'O'){
        points.oWins += 1;
    }
    localStorage.setItem('points', JSON.stringify(points));
}

function displayPoints(){
    document.querySelector('.js-display-score').innerHTML = `'X' Won: ${points.xWins} | 'O' Won: ${points.oWins} | Ties: ${points.ties}`;
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    let confirmation = document.querySelector('.confirmation');
    confirmation.classList.add('visible');
    confirmation.querySelector('.yes').addEventListener('click', () => {
        points.xWins = 0;
        points.oWins = 0;
        points.ties = 0;
        localStorage.setItem('points', JSON.stringify(points));
        displayPoints();
        confirmation.classList.remove('visible');
    });
    confirmation.querySelector('.no').addEventListener('click', () => {
        confirmation.classList.remove('visible');
    });
});