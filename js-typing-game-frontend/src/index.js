let currentUser
let gameHighestScore

document.addEventListener('DOMContentLoaded', () => {
  // let player = JSON.parse(localStorage.getItem('player'));
  // console.log(player)
  getCurrentPlayer();
  getHighestScore();
  renderHighestScore();
})
/* Dataflow
submit login form --> POST request to '/login' route
  get back user resource, set current user on the client side?

'login' route returns either..

a) player object rendered in JSON --> get rid or login screen
  --> render game screen
    - player presses 'start button'
    - game starts until game ends

   when the game ends, you send a POST request to games/create route.
    -> send GET request to retrieve new high score
    -> update DOM element with high score
    -> display 'GAME OVER' message and 'start' button reappears for player to click



b) or JSON error message --> render error message on page
*/

// LOGIN
const loginForm = document.querySelector('.js-login-form');

loginForm.addEventListener('submit', login);

function login(e) {
  const errorMessage = document.querySelector('.js-error-message');
  const successMessage = document.querySelector('.js-success-message');
  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');

  e.preventDefault();
  return fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({
      player : {
        username: `${e.target['player[username]'].value}`,
        password: `${e.target['player[password]'].value}`
      }
    })
  })
  .then(response => response.json())
  .then(resp => {
    // if credentials is correct, display message 'you're logged in'. console log current player
    if (resp.username) {
      successMessage.innerText = `Logged in as ${resp.username}.`
      successMessage.classList.remove('hidden');
      currentUser = resp;
      // localStorage.setItem('player', JSON.stringify(resp))
    } else {
      errorMessage.classList.remove('hidden');
      console.log(resp);
      // display message 'login error'
    }
  })
}

const dummyButton = document.querySelector('.dummy-button');

dummyButton.addEventListener('click', appleSauce);

function appleSauce() {
  const h1 = document.createElement('h1');
  h1.innerText = `${currentUser.username}`;
  document.body.appendChild(h1);
}

function getCurrentPlayer() {
  return fetch('http://localhost:3000/get_current_player', {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(resp => {
    console.log(resp)
    currentUser = resp;
  })
}

// SIGNUP
const signupForm = document.querySelector('.js-signup-form');
signupForm.addEventListener('submit', signup);

function signup(e) {
  e.preventDefault();

  return fetch('http://localhost:3000/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({
      player : {
        username: `${e.target['player[username]'].value}`,
        password: `${e.target['player[password]'].value}`
      }
    })
  })
  .then(response => response.json())
  .then(console.log)
}

// LOGOUT
const logoutBtn = document.querySelector('.js-logout-button');

logoutBtn.addEventListener('click', logout);

function logout() {
  return fetch('http://localhost:3000/logout', {
    credentials: 'include',
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(console.log)
}

// GAME
const startGameBtn = document.querySelector('.game-start-button');
startGameBtn.addEventListener('click', runGame);

function runGame(e) {
  console.log('clicked');
  return fetch('http://localhost:3000/games', {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      score: '90'
    })
  }).then(response => response.json())
}

function getHighestScore() {
  return fetch('http://localhost:3000/get_highest_score', {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(resp => gameHighestScore = resp)
}

function renderHighestScore() {
  highScoreDiv = document.querySelector('div.highest-score');
  highScoreDiv.innerText = gameHighestScore;
}
