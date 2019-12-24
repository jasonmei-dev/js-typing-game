class PlayersController < ApplicationController
  def index
    players = Player.all
    render json: players
  end

  def create #signup
    player = Player.new(player_params)
    if player.save
      session[:user_id] = player.id
      render json: player
    else
      response = {
        error: player.errors.full_messages.to_sentence
      }
      render json: response
    end
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
