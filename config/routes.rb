Rails.application.routes.draw do
  root 'cards#index'

  namespace :api do
    resources :cards, only: [:index, :update]
    resources :card_sets, only: [:index]
    resources :decks, only: [:index, :create] do
      member do
        get :build
      end
    end
  end

  get '*path', to: 'cards#index'
end
