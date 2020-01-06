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
    })
  }

  loggedIn() {
    return this.currentPlayer !== undefined;
  }

  handleLogin(e) {
    e.preventDefault();
    if (this.currentPlayer === undefined) {
      this.adapter.login(e.target).then(resp => {
        if (resp.username) {
          this.currentPlayer = resp;

          this.loginForm.classList.add('hidden');
          app.modalBackground.classList.add('hidden');

          const playerNameDisplay = document.querySelector('.player-name');
          playerNameDisplay.innerText = `Welcome ${resp.username}`;

          this.logoutButton.classList.remove('hidden');
          app.loginButton.classList.add('hidden');
          app.signupButton.classList.add('hidden');
        } else {
          alert(`${resp.error}`)
        }
      })
    } else {
      alert(`You're already logged in as ${this.currentPlayer.username}.`)
    }
    this.loginForm.reset();
  }

  handleLogout() {
    this.adapter.logout()
    .then(() => {
      this.currentPlayer = undefined;
      app.game.scoreDisplay.innerText = 0;
    })
    app.game.gameOverMessage.classList.add('hidden');
    this.logoutButton.classList.add('hidden');
    app.loginButton.classList.remove('hidden');
    app.signupButton.classList.remove('hidden');
    const playerNameDisplay = document.querySelector('.player-name');
    playerNameDisplay.innerText = '';
  }

  handleSignup(e) {
    e.preventDefault();
    if (this.currentPlayer === undefined) {
      this.adapter.signup(e.target).then(resp => {
        if (resp.error) {
          this.currentPlayer = undefined;
          alert(resp.error);
        } else {
          this.currentPlayer = resp;
          this.signupForm.classList.add('hidden');
          app.modalBackground.classList.add('hidden');

          const playerNameDisplay = document.querySelector('.player-name');
          playerNameDisplay.innerText = `Welcome ${resp.username}`;

          this.logoutButton.classList.remove('hidden');
          app.loginButton.classList.add('hidden');
          app.signupButton.classList.add('hidden');
        }
      })
    } else {
      alert("Can't sign up when you're logged in.")
    }
    this.signupForm.reset();
  }

}
