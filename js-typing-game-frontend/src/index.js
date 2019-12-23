document.addEventListener('DOMContentLoaded', () => {
  let player = JSON.parse(localStorage.getItem('player'));
  console.log(player)
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


const login = document.querySelector('.js-login-form');

login.addEventListener('submit', handleLogin);

function handleLogin(e) {
  // debugger
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
      localStorage.setItem('player', JSON.stringify(resp))
    } else {
      errorMessage.classList.remove('hidden');
      // display message 'login error'

    }
  })
}
