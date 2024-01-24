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
    turn.style.color = 'blue'
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
        const front = document.createElement('div')
        const back = document.createElement('div')

        card.classList.add('grid')
        front.classList.add('front')
        back.classList.add('back')

        card.appendChild(front)
        card.appendChild(back)

        card.setAttribute('data-index', i)
        
        card.addEventListener('click', (e) => reveal(e.currentTarget))

        cards.push(card)

        gridContainer.append(card)
    }
}

const reveal = (card) => {
    gridContainer.style.pointerEvents = 'none'

    const index = card.getAttribute('data-index')

    const back = card.lastChild
        
    back.innerHTML = `<img src="${foodArray[index].img}">` 
    
    card.classList.add('flip')

    update(index)
}

const update = (index) => {    
    switch (openCardIndex) {
        case -1:
            openCardIndex = index;
            gridContainer.style.pointerEvents = 'auto'
            break;

        case index:
            alert('Pick Another Card!');
            gridContainer.style.pointerEvents = 'auto'
            break;

        default:
            //If two cards are picked
            setTimeout(() => {
                endTurn(openCardIndex, index);        
            }, 1500);         
            break;
    }
}

const endTurn = (indexOne, indexTwo) => {  

    // Check if cards are of the same image
    if (foodArray[indexOne].name === foodArray[indexTwo].name) {
        //Cards are the same
        p1turn ? playerOneScore++ : playerTwoScore++
        p1Score.textContent = playerOneScore 
        p2Score.textContent = playerTwoScore

        cards[indexOne].style.visibility = 'hidden'
        cards[indexTwo].style.visibility = 'hidden'
    }else{
        //Cards are not the same
        setTimeout(() => {
            cards[indexOne].lastChild.innerHTML = ''
            cards[indexTwo].lastChild.innerHTML = ''
        }, 600);

        cards[indexOne].classList.remove('flip')
        cards[indexTwo].classList.remove('flip')

        p1turn = !p1turn
        p1turn ? turn.textContent = 'Player One' : turn.textContent = 'Player Two'
        p1turn ? turn.style.color = 'blue' : turn.style.color = 'red'
    }

    // Check end game condition
    if (playerOneScore + playerTwoScore >= cards.length/2) {
        if (playerOneScore === playerTwoScore) {
            winner.textContent = 'Everybody'}
        else {
            playerOneScore > playerTwoScore ? winner.textContent = 'Player One' : winner.textContent = 'Player Two' }

        winnerContainer.classList.remove('hidden')
    }

    openCardIndex = -1

    gridContainer.style.pointerEvents = 'auto'
}

init()