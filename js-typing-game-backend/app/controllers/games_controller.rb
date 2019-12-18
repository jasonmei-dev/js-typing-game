class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.create(game_params)
    render json: game
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  private

  def game_params
    params.require(:game).permit(:score, :user_id)
  end
end
