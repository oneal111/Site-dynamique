//Déclaration de mes variables
let activePlayer = 'p2';
let credits = 'hide';
let currentClass = '';
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const namePlayer1 = document.querySelector('#name-player-1');
const namePlayer2 = document.querySelector('#name-player-2');
let player1GlobalScore = document.querySelector('#player-1-global-score');
let p1GS = 0;
let player2GlobalScore = document.querySelector('#player-2-global-score');
let p2GS = 0;
let globalScore1 = [];
let globalScore2 = [];
let playerTempScore = document.querySelector('.player-temp-score');
let currentScore = [];
let tempScore = 0;
let info = document.querySelector('.info');
const playerWinner = document.querySelector('.player-winner');
const crown1 = document.querySelector('#crown-1');
const crown2 = document.querySelector('#crown-2');
const name1 = document.querySelector('#name-p1');
const name2 = document.querySelector('#name-p2');
const formNameChoice = document.querySelector('#name-choice');
const formContainer = document.querySelector('.form-container');
const winnerName = document.querySelector('.winner-name');
const p1Name = name1.value;
const p2Name = name2.value;
const upIcon = document.querySelector('#up');
const creditsDetails = document.querySelector('#details');
const actionGame = document.querySelector('.action-game');
const gameBoard = document.querySelector('.game-board');
const cube = document.querySelector('.cube');
const rulesBlock = document.querySelector('.rules-container');
const rulesBtn = document.querySelector('.btn-rule');
const rollBtn = document.querySelector('.rollBtn');
const guardBtn = document.querySelector('.guard');
const closeRulesBtn = document.querySelector('.close-rules');
const checkNameBtn = document.querySelector('#check-player-name');
const newGameBtn = document.querySelector('.btn-new-game');
const resetGameBtn = document.querySelector('.btn-reset-game');
const creditsBtn = document.querySelector('#credits');



function getRandomInt(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 

}

// Fonction pour lancer le dé et obtenir un score aléatoire entre 1 et 6 inclus
function rollDice() {

  let randNum = getRandomInt(1,7); 
  console.log(randNum)

  let showClass = 'show-' + randNum;

  if (currentClass) {
  cube.classList.remove(currentClass);
  }

  cube.classList.add(showClass);

  currentClass = showClass;
    
  currentScore.push(randNum);
  const bestReducer = (accumulator, curr) => accumulator + curr;
  tempScore = currentScore.reduce(bestReducer)
    
  playerTempScore.innerText = `${tempScore}`;
    
  if (randNum === 1) {
    tempScore = 0
    currentScore = []
    playerTempScore.innerText = 0;
    switchPlayer()
  }
}

// Fonction pour garder le score
function guardScore() {
    
  playerTempScore.innerText = `0`;
  
  switchPlayer()
  winner()

}

guardScore()

// Fonction pour déterminer un gagnant
function winner() {
  const p2WinnerName = name2.value;
  const p1WinnerName = name1.value;

  if (p2GS >= 100) {
    // Victoire du player 2
    playerWinner.style.display = 'inline-flex';
    playerWinner.style.background = '#EE6C4D';
    winnerName.innerText = `${p2WinnerName} a gagné !`;
  } else if (p1GS >= 100) {
    // Victoire du player 1
    playerWinner.style.display = 'inline-flex';
    playerWinner.style.background = '#d498d9';
    winnerName.innerText = `${p1WinnerName} a gagné !`;
    winnerName.style.color = '#293241';

  }
}

// Fonction qui permet de faire la somme des valeurs d'un tableau cette fonction va être utilisée pour les scores
function productofArray(product, num) { 
  return product + num; 
}

// Fonction pour changer de joueur
function switchPlayer() {

  if (activePlayer === 'p1') {
    activePlayer = 'p2';
  } else {
    activePlayer = 'p1';
  }

  //Cette fonction nous permet de savoir les actions à faire en fonction de chaque joueur
  switch (activePlayer) {
  
    case 'p1': {
      globalScore2.push(tempScore);
      p2GS = globalScore2.reduce(productofArray);
      player2GlobalScore.innerText = `${p2GS}`;
      tempScore = 0
      currentScore = []
      actionGame.style.background = '#d498d9';
      actionGame.style.color = '#293241';
      break;
    }
  
    case 'p2': {
      globalScore1.push(tempScore);
      p1GS = globalScore1.reduce(productofArray);
      player1GlobalScore.innerText = `${p1GS}`;
      tempScore = 0
      currentScore = []
      actionGame.style.background = '#EE6C4D';
      actionGame.style.color = '#d5ecec';
      break;
    }
    default: {
      console.log('Erreur de sélection de joueur');
    }
  }
}

// Fonction qui permet de contrôler que les champs des noms des joueurs ne soit pas vide ce qui contraint les joueurs à rentrer un pseudo pour pouvoir jouer
function nameLength () {
  if (name1.value === '' || name2.value === '') {
    checkNameBtn.style.display = 'none';
  } else {
    checkNameBtn.style.display = 'block';
  }
}

// Cette fonction à pour but de récupérer la valeur (noms des joueurs) et de l'utilisée pour le jeu
function validateName() {
  const p1Name = name1.value;
  const p2Name = name2.value;

  namePlayer1.innerText = `${p1Name}`;
  namePlayer2.innerText = `${p2Name}`; 

  formContainer.style.display = 'none';
  gameBoard.style.display = 'flex';
}

// Cette fonction permet de tout remettre à zéro pour relancer une nouvelle partie
function reset() {
  name1.value = '';
  name2.value = '';
  checkNameBtn.style.display = 'none';

  if (activePlayer === 'p2') {
    switchPlayer()
  } else {
    activePlayer = 'p1';
  }

  p1GS = 0;
  player2GlobalScore.innerText = `0`;
  player1GlobalScore.innerText = `0`;
  p2GS = 0;
  globalScore1 = [];
  globalScore2 = [];
  currentScore = [];
  tempScore = 0;

  playerWinner.style.display = 'none';
  formContainer.style.display = 'inline-flex';

}

// Cette fonction permet d'afficher ou de cacher les crédits
function toggleCredits() {
  if (credits === 'show') {
    credits = 'hide';
  } else {
    credits = 'show';
  }

  switch (credits) {
    case 'show': {
      creditsDetails.style.height = 'max-content';
      break;
    }
  
    case 'hide': {
      creditsDetails.style.height = '0';
      break;
    }
    
    default: {
      console.log('Erreur dans la visibilité des cédits');
    }
  }
}

// Validation input nom des joueurs
formNameChoice.addEventListener('input', nameLength);
formNameChoice.addEventListener('submit', event => {
  event.preventDefault();
});

// on click eventlistener for the button element
checkNameBtn.addEventListener("click", validateName);
rollBtn.addEventListener("click", rollDice);
guardBtn.addEventListener("click", guardScore);
resetGameBtn.addEventListener("click", reset);
newGameBtn.addEventListener("click", reset);
creditsBtn.addEventListener("click", toggleCredits);
rulesBtn.addEventListener("click", () => {rulesBlock.style.display = "inline-flex";});
closeRulesBtn.addEventListener("click", () => {rulesBlock.style.display = "none";});
