class App {
  constructor() {
    this.session = new Session();
    this.game = new Game();
    this.initBindingsAndEventListeners();
  }

  initBindingsAndEventListeners() {
    this.loginButton = document.querySelector('.login-button');
    this.signupButton = document.querySelector('.signup-button');


    this.loginCancelBtn = document.querySelector('.login-cancel');
    this.signupCancelBtn = document.querySelector('.signup-cancel');

    this.modalBackground = document.querySelector('.modal-background');

    this.loginButton.addEventListener('click', this.showLoginForm.bind(this));
    this.loginCancelBtn.addEventListener('click', this.cancelLogin.bind(this));
    this.signupButton.addEventListener('click', this.showSignupForm.bind(this));
    this.signupCancelBtn.addEventListener('click', this.cancelSignup.bind(this));
  }

  showLoginForm() {
    this.session.loginForm.classList.remove('hidden');
    this.modalBackground.classList.remove('hidden');
  }

  cancelLogin() {
    this.session.loginForm.classList.add('hidden');
    this.modalBackground.classList.add('hidden');
  }

  showSignupForm() {
    this.session.signupForm.classList.remove('hidden');
    this.modalBackground.classList.remove('hidden');
  }

  cancelSignup() {
    this.session.signupForm.classList.add('hidden');
    this.modalBackground.classList.add('hidden');
  }
}
