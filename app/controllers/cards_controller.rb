class CardsController < ApplicationController
  def index
    @cards = Card
      .joins(:card_set)
      .order('card_sets.name, cards.name')
      .all
  end
end
