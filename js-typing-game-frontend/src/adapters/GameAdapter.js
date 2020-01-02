class GameAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/games'
  }

  postGameData(gameScore) {
    return fetch(this.baseUrl, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        score: gameScore
      })
    }).then(response => response.json())
  }

  getHighScore() {
    return fetch('http://localhost:3000/games/get_highest_score', {
      credentials: 'include'
    })
    .then(response => response.json())
  }
}
