Dataflow
submit login form --> POST request to '/login' route
  get back user resource, set current user on the client side?

'login' route returns either..

a) player object rendered in JSON --> get rid or login screen
  --> render game screen
    - player presses 'start button'
    - game starts until game ends

   when the game ends, you send a POST request to games/create route.
    -> send GET request to retrieve new high score
    -> update DOM element with high score
    -> display 'GAME OVER' message and 'start' button reappears for player to click

b) or JSON error message --> render error message on page

Pages
1) Login page
2) signup page
3) home page/game page includes a start button
4) game over page/ restart

To-Do
1) Create Game class to handle game interactions (i.e. scorekeeping, animations)
  How Game Works
    - game window will have letters falling and the player will have to type the letters before they fall to the bottom of the window (will set window limits).
    - an internal timer will start counting when the player clicks the 'start button'. The letter drop speed and amount of letters will increase as the timer increases.
    - game ends once the player misses a letter.
    - game window will 'grey-out' and a 'GAME OVER' message will cover the game window.
    - Send POST fetch request with game score to API.
    - player clicks the 'start game' button to restart the game.
