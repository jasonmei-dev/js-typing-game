class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end

  def create
    if logged_in?
      game = Game.create(score: params[:score], player_id: current_player.id)
      render json: game
    else
      render json: { error: 'Must be logged in to play!' }
    end
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  def get_highest_score
    best_game = Game.find_by(score: Game.highest_score)
    render json: {
      id: best_game.id,
      score: best_game.score,
      player_id: best_game.player_id,
      player_name: best_game.player.username
    }
  end

end
