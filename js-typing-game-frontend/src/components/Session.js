class Session {
  constructor() {
    this.currentPlayer = undefined;
    this.adapter = new SessionsAdapter();
    this.setCurrentPlayer();
    this.initBindingsAndEventListeners();
  }

  initBindingsAndEventListeners() {
    this.loginForm = document.querySelector('.js-login-form');
    this.logoutButton = document.querySelector('.js-logout-button');
    this.signupForm = document.querySelector('.js-signup-form');
    this.loginForm.addEventListener('submit', this.handleLogin.bind(this));
    this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
    this.signupForm.addEventListener('submit', this.handleSignup.bind(this));
  }

  setCurrentPlayer() {
    this.adapter.getCurrentPlayer().then(resp => {
      if (resp.error) {
        this.currentPlayer = undefined;
      } else {
        this.currentPlayer = resp;
      }
      console.log(this.currentPlayer);
    })
  }

  handleLogin(e) {
    e.preventDefault();
    this.adapter.login(e.target).then(resp => {
      if (resp.username) {
        this.currentPlayer = resp;
        console.log(`logged in as ${this.currentPlayer.username}`)
        console.log(this.currentPlayer)
      } else {
        console.log(resp);
      }
    })
    this.loginForm.reset();
  }

  handleLogout() {
    this.adapter.logout()
    .then(() => {
      this.currentPlayer = undefined;
      game.scoreDisplay.innerText = 0;
      console.log('logout successful!')
    })
    .catch(() => console.log('logout unsuccessful'));
  }

  handleSignup(e) {
    e.preventDefault();
    this.adapter.signup(e.target).then(resp => {
      this.currentPlayer = resp;
      console.log(this.currentPlayer);
    })
    this.signupForm.reset();
  }

}
