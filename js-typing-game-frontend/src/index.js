const sessionApi = new SessionsAdapter;
const gameApi = new GameAdapter;
let currentPlayer;
let gameHighestScore;


document.addEventListener('DOMContentLoaded', init)

function init() {
  attachListeners();
  setCurrentPlayer();
  renderHighestScore();
}

function attachListeners() {
  document.querySelector('.js-login-form').addEventListener('submit', handleLogin);
  document.querySelector('.js-logout-button').addEventListener('click', handleLogout);
  document.querySelector('.js-signup-form').addEventListener('submit', handleSignup);
  document.querySelector('.dummy-button').addEventListener('click', appleSauce);
}

function setCurrentPlayer() {
  sessionApi.getCurrentPlayer().then(resp => {
    currentPlayer = resp;
    console.log(currentPlayer);
  })
}

// LOGIN
function handleLogin(e) {
  // debugger;
  e.preventDefault();
  sessionApi.login(e.target).then(resp => {
    if (resp.username) {
      currentPlayer = resp;
      console.log(`logged in as ${resp.username}`)
      console.log(currentPlayer)
    } else {
      console.log(resp);
    }
  })
}

// SIGNUP
function handleSignup(e) {
  e.preventDefault();
  sessionApi.signup(e.target).then(resp => {
    currentPlayer = resp;
    console.log(currentPlayer);
  })
}

// LOGOUT
function handleLogout() {
  sessionApi.logout()
  .then(() => {
    currentPlayer = undefined;
  })
  .catch(() => console.log('logout unsuccessful'))
}

function appleSauce() {
  const h1 = document.createElement('h1');
  h1.innerText = `${currentPlayer.username}`;
  document.body.appendChild(h1);
}

// GAME
const startButton = document.querySelector('.start-button');
const scoreDisplay = document.querySelector('.js-score');
const highScore = document.querySelector('.highest-score');
const gameWindow = document.querySelector('.game-container');
let gameOn = false;
let score = 0;
let time = 1000;
let letters = {}

function createLetter(leftPxs) {
  const letter = document.createElement('h1');
  letter.className = 'animate';
  letter.innerText = `${randomLetter()}`;
  letter.style.left = `${leftPxs}px`;
  if (letters[letter.innerText] === undefined) letters[letter.innerText] = [];
  letters[letter.innerText].push(letter);
  gameWindow.appendChild(letter);
  letter.addEventListener('animationend', gameOver);
}

startButton.addEventListener('click', function() {
  gameOn = true;
  score = 0;
  scoreDisplay.innerText = score;
  setTimeout(play, time);

  function play() {
    if (gameOn) {
      const gridRange = 10;
      let px = (Math.floor(Math.random() * gridRange) * 50) + 10;
      createLetter(px);
      time = Math.max(time - score, 300);
      setTimeout(play, time);
      console.log(time);
    }
  }
});

document.addEventListener('keydown', e => {
  if (letters[e.key] !== undefined && letters[e.key].length > 0 && gameOn) {
    let temp = letters[e.key].shift();
    incrementScore();
    temp.remove();
  }
});

function gameOver() {
  if (gameOn) {
    gameOn = false;
    // remove all letter elements from DOM
    // reset letter obj to empty obj
    console.log('GAME OVER!');
    resetGame();
  }
}

function resetGame() {
  for (const key in letters) {
    let nodeArray = letters[key];
    for (const node of nodeArray) {
      node.remove();
    }
  }
  letters = {};
  time = 1000;
}

function incrementScore() {
  score += 1;
  scoreDisplay.innerText = score;
}

function randomLetter() {
  const range = "abcdefghijklmnopqrstuvwxyz[]',./".split('');
  const randomindex = Math.floor(Math.random() * range.length);
  return range[randomindex];
}

function renderHighestScore() {
  gameApi.getHighestScore().then(resp => {
    gameHighestScore = resp.score
    highScore.innerText = gameHighestScore;
  })
}

// function runGame() {
//   gameApi.postGameData()
//   .then(() => renderHighestScore())
//   console.log('clicked');
// }
