class Game {
  constructor() {
    this.gameOn = false;
    this.score = 0;
    this.time = 1000;
    this.letters = {};
    this.adapter = new GameAdapter();
    this.renderHighScore();
    this.initBindingsAndEventListeners();
  }

  initBindingsAndEventListeners() {
    this.scoreDisplay = document.querySelector('.js-score');
    this.highScoreDisplay = document.querySelector('.high-score');
    this.gameWindow = document.querySelector('.game-container');
    this.startButton = document.querySelector('.start-button');
    this.startButton.addEventListener('click', this.startGame.bind(this));
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  startGame() {
    if (session.currentPlayer !== undefined) {
      this.gameOn = true;
      this.score = 0;
      this.scoreDisplay.innerText = this.score;
      setTimeout(this.playGame.bind(this), this.time);
    } else {
      console.log('You must log in to play!')
    }
  }

  playGame() {
    if (this.gameOn) {
      const gridRange = 10;
      let px = (Math.floor(Math.random() * gridRange) * 50) + 10;
      this.createLetter(px);
      this.time = Math.max(this.time - this.score, 320);
      setTimeout(this.playGame.bind(this), this.time);
      // console.log(this.time);
    }
  }

  gameOver() {
    if (this.gameOn) {
      this.gameOn = false;
      console.log('GAME OVER!');
      this.adapter.postGameData(this.score);
      if (this.score > this.highScore) {
        this.highScore = this.score
        this.highScoreDisplay.innerText = this.highScore;
      }
      this.resetGame();
    }
  }

  resetGame() {
    for (const key in this.letters) {
      let nodeArray = this.letters[key];
      for (const node of nodeArray) {
        node.remove();
      }
    }
    this.letters = {};
    this.time = 1000;
  }

  createLetter(leftPxs) {
    const letter = document.createElement('h1');
    letter.className = 'animate';
    letter.innerText = `${this.randomLetter()}`;
    letter.style.left = `${leftPxs}px`;
    if (this.letters[letter.innerText] === undefined) this.letters[letter.innerText] = [];
    this.letters[letter.innerText].push(letter);
    this.gameWindow.appendChild(letter);
    letter.addEventListener('animationend', this.gameOver.bind(this));
  }

  handleKeyPress(e) {
    if (this.letters[e.key] !== undefined && this.letters[e.key].length > 0 && this.gameOn) {
      let pressedKey = this.letters[e.key].shift();
      this.incrementScore();
      pressedKey.remove();
    }
  }

  incrementScore() {
    this.score += 1;
    this.scoreDisplay.innerText = this.score;
  }

  randomLetter() {
    const range = "abcdefghijklmnopqrstuvwxyz".split('');
    const randomindex = Math.floor(Math.random() * range.length);
    return range[randomindex];
  }

  renderHighScore() {
    this.adapter.getHighScore().then(resp => {
      this.highScore = resp.score;
      this.highScoreDisplay.innerText = this.highScore;
    })
  }

 }
