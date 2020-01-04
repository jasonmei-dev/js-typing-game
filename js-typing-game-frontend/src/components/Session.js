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
    this.welcomeMessage = document.querySelector('.welcome-message');
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

  handleLogin(e) {
    e.preventDefault();
    if (this.currentPlayer === undefined) {
      this.adapter.login(e.target).then(resp => {
        if (resp.username) {
          this.currentPlayer = resp;
          const h1 = document.createElement('h1');
          h1.innerText = `Welcome, ${this.currentPlayer.username}`
          this.welcomeMessage.appendChild(h1);
          this.welcomeMessage.classList.remove('hidden');
        } else {
          console.log(resp.error);
        }
      })
    } else {
      console.log(`You're already logged in as ${this.currentPlayer.username}.`)
    }
    this.loginForm.reset();
  }

  handleLogout() {
    this.adapter.logout()
    .then(() => {
      this.currentPlayer = undefined;
      game.scoreDisplay.innerText = 0;
    })
    this.welcomeMessage.classList.add('hidden');
  }

  handleSignup(e) {
    e.preventDefault();
    if (this.currentPlayer === undefined) {
      this.adapter.signup(e.target).then(resp => {
        if (resp.error) {
          this.currentPlayer = undefined;
          console.log(resp.error);
        } else {
          this.currentPlayer = resp;
        }
      })
    } else {
      console.log("Can't sign up when you're logged in.")
    }
    this.signupForm.reset();
  }

}
