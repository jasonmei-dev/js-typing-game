class SessionsController < ApplicationController

  def create #login
    player = Player.find_by(username: params[:player][:username])

    if player && player.authenticate(params[:player][:password])
        session[:user_id] = player.id
        render json: player
      else
        render json: { error: "Invalid Credentials" }
      end
  end

  def destroy
    session.clear
    render json: { notice: 'Successfully logged out'}
  end

  def get_current_player
    if logged_in?
      render json: current_player
    else
      render json: { error: 'Not logged in' }
    end
  end
end
