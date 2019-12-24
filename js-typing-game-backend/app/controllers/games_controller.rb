class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end
  #
  # def create
  #   game = Game.create(game_params)
  #   render json: game
  # end

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
    # binding.pry
    render json: { score: Game.highest_score }
  end

  private
    def game_params
      params.require(:game).permit(:score, :player_id)
    end
end
