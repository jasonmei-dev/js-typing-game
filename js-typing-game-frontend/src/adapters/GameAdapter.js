class GameAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/games'
  }

  postGameData(gameScore) { // will take gameData as argument
    return fetch(this.baseUrl, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        score: gameScore // should be gameData.score
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
