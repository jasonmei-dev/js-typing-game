class SessionsController < ApplicationController

  def create #login
    player = Player.find_by(username: params[:player][:username])

    if player && player.authenticate(params[:player][:password])
        session[:user_id] = player.id
        # binding.pry
        render json: player
      else
        render json: { error: "Invalid Credentials" }
      end
  end

  def destroy
    session.clear
    render json: { status: 200, logged_out: true }
  end
end
