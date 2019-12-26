class SessionsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }

  login(playerData) {
    return fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        player : {
          username: `${playerData.username.value}`,
          password: `${playerData.password.value}`
        }
      })
    })
    .then(response => response.json())
  }

  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(response => response.json())
  }

  signup(playerData) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        player : {
          username: `${playerData.username.value}`,
          password: `${playerData.password.value}`
        }
      })
    })
    .then(response => response.json())
  }

  getCurrentPlayer() {
    return fetch(`${this.baseUrl}/get_current_player`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
  }

}
