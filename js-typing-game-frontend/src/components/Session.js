class Session {
  constructor() {
    this.currentPlayer = undefined;
    this.adapter = new SessionsAdapter();
    this.setCurrentPlayer();
    this.initBindingsAndEventListeners();
  }

  initBindingsAndEventListeners() {
    this.loginForm = document.querySelector('.login-form');
    this.logoutButton = document.querySelector('.logout-button');
    this.signupForm = document.querySelector('.signup-form');
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
          this.logoutButton.classList.remove('hidden');
          this.loginForm.classList.add('hidden');
          app.modalBackground.classList.add('hidden');
          app.loginButton.classList.add('hidden');
          app.signupButton.classList.add('hidden');
          app.welcome.classList.remove('hidden');
          app.playerNameDisplay.innerText = `${resp.username}`;
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
    this.logoutButton.classList.add('hidden');
    app.game.gameOverMessage.classList.add('hidden');
    app.loginButton.classList.remove('hidden');
    app.signupButton.classList.remove('hidden');
    app.welcome.classList.remove('hidden');
    app.welcome.classList.add('hidden');
    app.playerNameDisplay.innerText = '';
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
          app.welcome.classList.remove('hidden');
          app.playerNameDisplay.innerText = `${resp.username}`;
          app.loginButton.classList.add('hidden');
          app.signupButton.classList.add('hidden');
          this.logoutButton.classList.remove('hidden');
        }
      })
    } else {
      alert("Can't register when you're already logged in.")
    }
    this.signupForm.reset();
  }

}
