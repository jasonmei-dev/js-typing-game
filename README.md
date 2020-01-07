# js-typing-game

This is a SPA made for Flatiron School's Rails/Javascript Portfolio Project called Keyboard Frenzy. Keyboard Frenzy is a typing game that uses a Rails API backend with a Javascript frontend. This app also has Rails sessions and cookies added back to the API so the user can log in/out and create an account before playing the game.

## Installation & Usage

Currently this game can only be played on Google Chrome and requires the user to download the Google Chrome app [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en).

Backend Setup:
1. Run `$ cd js-typing-game-backend` and run `$ bundle install` to install all gem dependencies.
2. Run all Rails migrations with `$ rails db:migrate`.
3. Run `$ rails db:seed` to load seed data.
4. Run `$ rails server` to start up the default Rails server `localhost:3000`.

Frontend Setup:
1. Launch Google Chrome browser or open a new tab.
2. Install [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) if you haven't done so already.
3. Launch [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en), select folder of `js-typing-game-frontend`, and start the web server (make sure the checkbox for "Automatically show index.html" is checked off). The game runs on the default port of 8887.
4. Navigate to `localhost:8887` in the Chrome browser and the game will load.


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jmei403/js-typing-game. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
