let PlayerText = document.getElementById('PlayerText');
let restartButton = document.getElementById('restartButton');
let newGameButton = document.getElementById('newGameButton');
let boxes =Array.from(document.getElementsByClassName('box'));
let winnerIndicater = getComputedStyle(document.body).getPropertyValue('--winning-block')
let playCount = 0
let p1score = document.getElementById('p1')
let p2score = document.getElementById('p2')
let score1 = 0
let score2 = 0
p1score.value=score1
p2score.value=score2


const PlayerOne = 'X';
const PlayerTwo = 'O';
currentPlayer = PlayerOne;

let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    
    if (spaces[id]==null && playCount<9){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerWon()!=false){
            PlayerText = `${currentPlayer} has won!`
            let winning_blocks = playerWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicater)
            if (currentPlayer == 'X'){
                score1++
                p1score.value=score1
                console.log(score1)
            }
            else{
                score2++
                p2score.value=score2
            }
            setTimeout(() => {
                restart()
            }, 1000);
        }
        playCount++
        currentPlayer = currentPlayer==PlayerOne ? PlayerTwo : PlayerOne
    }
}

const winningComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWon(){
    
    for (const condition of winningComb) {
        let [a,b,c] = condition

        if (spaces[a] && (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return [a,b,c]
        }
    }
    return false
}

restartButton.addEventListener('click',restart)
newGameButton.addEventListener('click',newGame)

function restart(){
    spaces.fill(null)

    boxes.forEach(box =>{
        box.innerText = ''
        box.style.backgroundColor=''
    })
    playCount = 0
    currentPlayer = PlayerOne
}

function newGame(){   
    score1 = 0
    score2 = 0
    p1score.value = score1
    p2score.value = score2
    restart()
}


startGame()