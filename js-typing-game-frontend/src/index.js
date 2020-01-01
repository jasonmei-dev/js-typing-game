const sessionApi = new SessionsAdapter;
const game = new Game();
let currentPlayer;

document.addEventListener('DOMContentLoaded', init)

function init() {
  attachSessionsListeners();
  setCurrentPlayer();
  game.renderHighScore();
}

function attachSessionsListeners() {
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
