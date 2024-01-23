const gridContainer = document.querySelector('.grid-container')
const turn = document.querySelector('.turn')
const p1Score = document.querySelector('.p1 .score')
const p2Score = document.querySelector('.p2 .score')
const winnerContainer = document.querySelector('.winner-container')
const winner = document.querySelector('.winner')

let cards;
let playerOneScore;
let playerTwoScore;
let p1turn;
let openCardIndex;


const init = () => {
    winnerContainer.classList.add('hidden')
    turn.textContent = 'Player One'
    p1Score.textContent = '0'
    p2Score.textContent = '0'
    gridContainer.innerHTML = ''

    cards = []

    playerOneScore = 0
    playerTwoScore = 0
    p1turn = true
    openCardIndex = -1

    foodArray.sort(() => 0.5 - Math.random())

    for (let i = 0; i < foodArray.length; i++) {
        const card = document.createElement('div')

        card.classList.add('grid')

        card.setAttribute('data-id', i)
        
        card.addEventListener('click', (e) => reveal(e.currentTarget))

        cards.push(card)

        gridContainer.append(card)
    }

}

const reveal = (card) => {
    gridContainer.style.pointerEvents = 'none'

    const index = card.getAttribute('data-id')
        
    card.innerHTML = `<img src="${foodArray[index].img}">` 

    updateGameState(index)
}

const updateGameState = (index) => {    
    switch (openCardIndex) {
        case -1:
            openCardIndex = index;
            gridContainer.style.pointerEvents = 'auto'
            break;

        case index:
            alert('Pick Another Card!1!!!11');
            gridContainer.style.pointerEvents = 'auto'
            break;

        default:
            setTimeout(() => {
                changeTurn(openCardIndex, index);
            }, 2000);         
            break;
    }
}

const changeTurn = (indexOne, indexTwo) => {  

    // Check if cards are of the same image
    if (foodArray[indexOne].name === foodArray[indexTwo].name) {
        p1turn ? playerOneScore++ : playerTwoScore++
        p1Score.textContent = playerOneScore 
        p2Score.textContent = playerTwoScore

        cards[indexOne].style.visibility = 'hidden'
        cards[indexTwo].style.visibility = 'hidden'
    }else{
        cards[indexOne].innerHTML = ''
        cards[indexTwo].innerHTML = ''
    }

    // Check end game condition
    if (playerOneScore + playerTwoScore >= cards.length/2) {
        if (playerOneScore === playerTwoScore) {
            winner.textContent = 'Everyone'}
        else {
            playerOneScore > playerTwoScore ? winner.textContent = 'Player One' : winner.textContent = 'Player Two' }

        winnerContainer.classList.remove('hidden')
    }

    openCardIndex = -1
    p1turn = !p1turn

    p1turn ? turn.textContent = 'Player One' : turn.textContent = 'Player Two'

    gridContainer.style.pointerEvents = 'auto'
}

init()