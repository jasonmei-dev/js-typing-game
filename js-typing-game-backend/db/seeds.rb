# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
player_1 = Player.create(name: "Jason")
player_2 = Player.create(name: "Helen")
game_1 = Game.create(score: 20, player_id: 1)
game_2 = Game.create(score: 50, player_id: 2)
