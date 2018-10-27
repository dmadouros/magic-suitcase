module Api
  class CardSetsController < ApplicationController
    def index
      card_sets = CardSet.all

      render json: present_card_sets(card_sets)
    end

    private

    def present_card_sets(card_sets)
      card_sets.reduce({}) do |memo, card_set|
        memo.merge(card_set.id.to_s => present_card_set(card_set))
      end
    end

    def present_card_set(card_set)
      {
        id: card_set.id.to_s,
        name: card_set.name,
        abbreviation: card_set.abbreviation,
      }
    end
  end
end
