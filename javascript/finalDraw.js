// const getDeck = require('./getDeck');
// import {getDeck} from './getDeck.js';

//   GAME STATE

let fullDeck = [];
let pStack = [];
let pActive = [];
let compStack = [];
let compActive = [];
let warWinningsStack = [];
let pPairs = [];
let compPairs = [];
let pScore;
let compScore;
let winner = null;
let newGame = true
let atWar = false
let warWinner = ""


// Cached Items

const pStackEl = document.getElementById('playerStack');
let pActiveEl = document.getElementById("playerActive");
const compStackEl = document.getElementById('compStack');
let compActiveEl = document.getElementById("compActive");
let pCardsEl = document.getElementById('playerCards');
let compCardsEl = document.getElementById('compCards');
let restartEl = document.getElementById('restart');
const playEl = document.getElementById('play');
const startEl = document.getElementById('start');
let msgEl = document.getElementById('infoBar');
let playerName = document.getElementById('playerName')
let standardView = document.getElementsByClassName('standardView');
let warView = document.getElementsByClassName('warView');
// let warEl = document.get

let compWar1 = document.getElementById('compWar1')
let compWar2 = document.getElementById('compWar2')
let compWar3 = document.getElementById('compWar3')
let compWarValueCard = document.getElementById('compWarValueCard')

let playerWar1 = document.getElementById('playerWar1')
let playerWar2 = document.getElementById('playerWar2')
let playerWar3 = document.getElementById('playerWar3')
let playerWarValueCard = document.getElementById('playerWarValueCard')

// Events

playEl.addEventListener('click', play);
restartEl.addEventListener('click', init)
startEl.addEventListener('click', start)


// sets the game state
init();


// Builds card deck by assigning 14 numeric values to each suit in assending order 

function getDeck() {
    const suits = ["h", "c", "d", "s"];
    const values = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];
    
    for (suit in suits) {
        for (value in values) {
            fullDeck.push(`${suits[suit]}${values[value]}`);
        }
    }
}

// function to shuffle cards

function shuffleAndSplit(cards) {
    let random;
    let hold;

    shuffle(cards);
    
    pStack = fullDeck.slice(0, 26);
    compStack = fullDeck.slice(26, 52);
    

    // temp for testing
    // pStack[0] = "c12"
    // pStack[3] = "d04"
    // compStack[0] = "d12"
    // pStack[25] = "d04"
    // compStack[25] = "d04"
    // pStack[24] = "d04"
    // compStack[24] = "d04"
    // pStack[20] = "d04"
    // compStack[20] = "d04"
    // compStack[3] = "c04"

    function shuffle(cards){  
        for (let i = 0; i < cards.length; i++) {
            random = Math.floor(Math.random() * (i + 1)),
            hold = cards[i],
            cards[i] = cards[random],
            cards[random] = hold;
        }
    }
}

// updates image to correspond to current card in player hand, removes visible card if there are
// no more cards in player hand

function currentCard() {
    pActiveEl.className = "card xlarge no-border";
    compActiveEl.className = "card xlarge no-border";
    pActiveEl.classList.add(pStack[0]);
    compActiveEl.classList.add(compStack[0]);
    if (pStack.length === 0) {
        pActiveEl.className = "";
        compActiveEl.className = "";
    }
};

// function to display in the message bar who is in the lead

function checkForWinner() {
    if (pStack.length === 0) {
        if (pPairs.length > compPairs.length) {
            winner = 'playerWins';
        }
        else if (compPairs.length > pPairs.length) {
            winner = 'computerWins';
        }
        // else if (atWar === true) {
        //     if ()
        // }
        else winner = 'tie';
    }
}

// function to disable the start button if it is not a new game
 
function disableStartBtn() {
    if (newGame === false) {
        startEl.disabled = true;
        startEl.style.backgroundColor = "#444444";
    } 
    else if (newGame === true) {
        startEl.disabled = false;
        startEl.style.backgroundColor = "#ffffff";
    }
}

function message() {
    if (pPairs.length === compPairs.length) {
        msgEl.innerHTML = 'Tied Game';
        return
    }
    if (pPairs.length > compPairs.length) {
        msgEl.innerHTML = "Darone is winning!";
        return
    }
    if (compPairs.length > pPairs.length) {
        msgEl.innerHTML = "Natalia is winning!";
        return
    }
};

// changes message Bar based on winner
function winnerFunc() {
    if (winner === 'playerWins') {
        msgEl.innerHTML = "Darone wins";
    }
    if (winner === 'computerWins') {
        msgEl.innerHTML = 'Natalia Wins';
    }
    if (winner === 'tie') {
        msgEl.innerHTML = 'Tied Game - Play Again!';
    }
};

// Attached to the 'Start' button - shuffles cards, splits the deck, 
// makes first card in each hand visible, clears the message line

function start() {
    startGame();
    msgEl.innerHTML = "";
    render();
}

// Attached to the 'play' button - grabs the next card and logs points
function play(evt) {
    if (pStack.length === 0) {
        exitWarScenario();
        render()
    }
    next();
    render();
};


// Gets the value of the current cards and compares to finner winner of round, adds card 
// pair to winning pile

function next() {

    if (pStack.length === 0) {
        return
    }

    let pValue = pStack[0].slice(1);
    let compValue = compStack[0].slice(1);
    console.log(`player pile: ${pStack} -> ${pStack.length}`)
    console.log(`comp pile: ${compStack} -> ${compStack.length}`)

    if (pValue === compValue) {
        atWar = true
        warCurrentCard()
        goToWar();
        winnerOfWar();
        // if (pWarValue === compWarValue)
    }

    // else if (pendingWar = true){
    //     winnerOfWar();
    // }
    
    else if (atWar === true) {
        exitWarScenario()
    }    

    else if (pValue > compValue) {
        pPairs.push(pStack[0]);
        pPairs.push(compStack[0]);
        pStack.shift();
        compStack.shift();
    }

    else if (compValue > pValue) {
        compPairs.push(compStack[0]);
        compPairs.push(pStack[0]);
        pStack.shift();
        compStack.shift();
    }

    console.log(`player pairs: ${pPairs} ----> ${pPairs.length}`)
    console.log(`comp pairs: ${compPairs} ----> ${compPairs.length}`)


}



// displays first card in each deck, enables the play button, calls shuffle function
// splits the deck, calls the current card function 
function startGame() {
    msgEl.innerHTML = "";
    winner = null;

    shuffleAndSplit(fullDeck);

    pActive = null;
    compActive = null;
    currentCard();
    playEl.style.visibility = "visible";
};

// add points to winning player, pushes winning cards to winning player pairs pile, removes played 
// card from each players hand, checks for winner

function render() {
    // pCardsEl.innerHTML = pPairs.length;
    // compCardsEl.innerHTML = compPairs.length;
    if (atWar === true) {
        message();
        checkForWinner()
        winnerFunc();
        disableStartBtn();

    } else {
        currentCard();
        message();
        checkForWinner()
        winnerFunc();
        disableStartBtn();
        pCardsEl.innerHTML = pPairs.length;
        compCardsEl.innerHTML = compPairs.length;
    }
    // message();
    // checkForWinner()
    // winnerFunc();
    // disableStartBtn();

    // if (newGame = true) {
    //     startEl.disabled = false;
    //     startEl.style.backgroundColor = "#ffffff"

    // } else { 
    //     startEl.disabled = true;
    //     startEl.style.backgroundColor = "black"
    // }

   
};


// initializes the game state / Resets the game state (attached to reset button)
function init() {

    // getDeck.execute();
    getDeck();
    exitWarScenario();

    winner = null;
    newGame = true
    pActiveEl.className = "";
    compActiveEl.className = "";
    pStack = [];
    pActive = [];
    compStack = [];
    compActive = [];
    pPairs = [];
    compPairs = [];
    msgEl.innerHTML = "Get Ready for War!";
    pCardsEl.innerHTML = pPairs.length;
    compCardsEl.innerHTML = compPairs.length;
    playEl.style.visibility = "hidden";

};

// Gets the war card value by removing suit / compares the value of war card (4th card in each players stack) / pushes all 8 war cards in play into winners pairs pile

function winnerOfWar() {
    let pWarValue;
    let compWarValue;
    let indexToPush = 3

    if (!pStack[indexToPush] && !compStack[indexToPush]){
        pWarValue = pStack[pStack.length - 1].slice(1);
        compWarValue = compStack[compStack.length - 1].slice(1);
        indexToPush = pStack.length - 1
        console.log(`This is the VALUUEEEE ${pWarValue}`)
        console.log(`This is the VALUUEEEE ${compWarValue}`)
        getWarWinner(indexToPush, pWarValue, compWarValue)    
    } 
    
    else {
        console.log(`check : ${pWarValue}`)
        console.log(`check : ${compWarValue}`)
        pWarValue = pStack[indexToPush].slice(1)
        compWarValue = compStack[indexToPush].slice(1)
        console.log(`check : ${pWarValue}`)
        console.log(`check : ${compWarValue}`)
        getWarWinner(indexToPush, pWarValue, compWarValue)    

    }


    function getWarWinner(indexToPush, pWarValue, compWarValue) {
        let index = indexToPush
        console.log(index)


        if (pWarValue > compWarValue) {
            for (let i = 0 ; i < (index + 1) ; i++) {
                console.log("this is working")
                pPairs.push(pStack[i]);
                pStack.splice(0,1);
                pPairs.push(compStack[i]);
                compStack.splice(0,1);
                console.log(pPairs)
                console.log("Darone wins round")
                if (compStack.length < 4) {
                    pCardsEl.innerHTML = compPairs.length - (pStack.length + compStack.length);

                } else 
                    pCardsEl.innerHTML = pPairs.length - 8;
            }
        } else if (compWarValue > pWarValue) {
            for (let i = 0 ; i < (index + 1) ; i++) { 
                compPairs.push(compStack[i]);
                compStack.splice(0,1);
                compPairs.push(pStack[i]);
                pStack.splice(0,1);
                console.log(compPairs)
                console.log("Natalia Wins Round")
                if (compStack.length < 4) {
                    compCardsEl.innerHTML = compPairs.length - (compStack.length + pStack.length);

                } else 
                    compCardsEl.innerHTML = compPairs.length - 8;

            }
                
        } else if (pWarValue === compWarValue) {
            
            console.log(`this is the incremented index: ${index}`)
            console.log(`next war`)

                if (pStack[index]){
                    console.log(`this is the war value ${pWarValue}`)
                    pWarValue = pStack[index].slice(1);
                    playerWarValue = pStack[index].slice(1);
                    
                    if (pWarValue > compWarValue) {
                        for (let i = 0 ; i < (index + 1) ; i++) {
                            // warWinningsStack.push(pStack[i]);
                            // pStack.splice(0,1);
                            // warWinningsStack.push(compStack[i]);
                            // compStack.splice(0,1);
                            // console.log(`war winning stack:${warWinningsStack}`)
                            pPairs.push(pStack[i]);
                            pStack.splice(0,1);
                            pPairs.push(compStack[i]);
                            compStack.splice(0,1);
                            console.log(pPairs)
                            console.log("Darone wins round")
                        }
                    } 
                    else if (compWarValue > pWarValue) {
                        for (let i = 0 ; i < (index + 1) ; i++) {
                            // warWinningsStack.push(compStack[i]);
                            // compStack.splice(0,1);
                            // warWinningsStack.push(pStack[i]);
                            // pStack.splice(0,1);
                            // console.log(`war winning stack:${warWinningsStack}`)
                            compPairs.push(compStack[i]);
                            compStack.splice(0,1);
                            compPairs.push(pStack[i]);
                            pStack.splice(0,1);
                            console.log(compPairs)
                            console.log("Natalia Wins Round")
                        }
                    } 
                    else {

                        if (pWarValue === compWarValue && pStack.length < 4) {
                            pStack.splice(0,pStack.length);
                            compStack.splice(0,compStack.length);
                            exitWarScenario()
                        } 
                        else if (pWarValue === compWarValue) {
                            getWarWinner((index + 4), pWarValue, compWarValue)
                        }
                    }
                        
                
                    
                }
                else {
                    index = pStack.length - 1
                    pWarValue = pStack[pStack.length -1]
                    compWarValue = compStack[compStack.length -1]
                    getWarWinner((index), pWarValue, compWarValue)

                    
                }
            // return getWarWinner((index + 4), pWarValue, compWarValue)
        } return  pWarValue, compWarValue
    }
}  

function warCurrentCard() {
    let war = []
    for (let i = 0 ; i < warView.length ; i++) {
        war.push(warView[i])
    }
    war.forEach(element => {
        element.style.display = 'inline';
    })
    playerWar1.className = "card xlarge no-border";
    playerWar2.className = "card xlarge no-border";
    playerWar3.className = "card xlarge no-border";
    playerWarValueCard.className = "card xlarge no-border";
    playerWar1.classList.add(pStack[0]);
    playerWar2.classList.add(pStack[1]);
    playerWar3.classList.add(pStack[2]);
    playerWarValueCard.classList.add(pStack[3]);

    compWar1.className = "card xlarge no-border";
    compWar2.className = "card xlarge no-border";
    compWar3.className = "card xlarge no-border";
    compWarValueCard.className = "card xlarge no-border";
    compWar1.classList.add(compStack[0]);
    compWar2.classList.add(compStack[1]);
    compWar3.classList.add(compStack[2]);
    compWarValueCard.classList.add(compStack[3]);
};


function exitWarScenario() {
    atWar = false
    document.body.style.backgroundColor = '#658B6F';

    function hideWarView (){
        let war = []
        for (let i = 0 ; i < warView.length ; i++) {
            war.push(warView[i])
        }
        war.forEach(element => {
            element.style.display = 'none';
        })
    }
    function displayStandardView() {
        let standard = []
        for (let i = 0 ; i < standardView.length ; i++) {
            standard.push(standardView[i])
        }
        standard.forEach(element => {
            element.style.display = 'inline';
        })
    }
        
    hideWarView();
    displayStandardView();
    
}


function goToWar() {
    document.body.style.backgroundColor = 'indianred';

    function HideStandardView (){
        let views = []
        for (let i = 0 ; i < standardView.length ; i++) {
            views.push(standardView[i])
        }
        views.forEach(view => {
            view.style.display = 'none';
        })
    }
    HideStandardView();
    warCurrentCard();
}