class PlayersController < ApplicationController
  def index
    players = Player.all
    render json: players
  end

  def create #signup
    player = Player.new(player_params)
    render json: player
  end

  def show
    player = Player.find(params[:id])
    render json: player
  end

  private
    def player_params
      params.require(:player).permit(:username, :password)
    end
end
