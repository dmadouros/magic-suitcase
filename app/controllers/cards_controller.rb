class CardsController < ApplicationController
  def index
    @cards = Card
      .joins(:card_set)
      .joins(:card_type)
      .order('card_sets.name, cards.name')
      .all
  end
end
