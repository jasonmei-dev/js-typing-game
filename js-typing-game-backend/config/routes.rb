Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  post 'signup' => 'players#create'
  delete '/logout' => 'sessions#destroy'
  get '/get_current_player' => 'sessions#get_current_player'
  get '/games/get_highest_score' => 'games#get_highest_score'

  resources :games
  resources :players
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
