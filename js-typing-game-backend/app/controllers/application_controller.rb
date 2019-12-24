class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  
  def current_player
    Player.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_player
  end
end
