class GameAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/games'
  }

  postGameData() {
    return fetch(this.baseUrl, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        score: '100'
      })
    }).then(response => response.json())
  }

  getHighestScore() {
    return fetch('http://localhost:3000/games/get_highest_score', {
      credentials: 'include'
    })
    .then(response => response.json())
  }
}
