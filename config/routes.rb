Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :cards, only: [:index]

  namespace :api do
    resources :cards, only: [:index, :update]
    resources :card_sets, only: [:index]
  end
end
