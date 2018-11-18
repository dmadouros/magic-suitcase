module Api
  class CardsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      cards = Card
        .includes(:card_set)
        .joins(:card_set)
        .order(:name)

      render json: present_cards(cards)
    end

    def update
      card = Card.find(params[:id])
      card.update(quantity: params[:quantity])

      head 200
    end

    private

    def present_cards(cards)
      cards.reduce({}) do |memo, card|
        memo.merge(card.id.to_s => present_card(card))
      end
    end

    def present_card(card)
      {
        id: card.id.to_s,
        name: card.name,
        quantity: card.quantity,
        card_set_id: card.card_set_id.to_s
      }
    end
  end
end
