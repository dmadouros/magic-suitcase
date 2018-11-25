module Api
  class DecksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      decks = Deck.order(name: :asc)
      ids = decks.pluck(:id).map(&:to_s)

      render json: { ids: ids, entities: present_decks(decks) }
    end

    def create
      canonicalize_split_card_name = ->(line) {
        match = /(.*?)\s?\/+\s?(.*)/.match(line)
        match ? "#{match[1]} // #{match[2]}" : line
      }

      contents = params[:deckContents]
        .split("\n")
        .map(&:strip)
        .compact
        .map(&canonicalize_split_card_name)
        .join("\n")

      if Deck.create(name: params[:name], contents: contents)
        head 200
      end
    end

    def build
      deck = Deck.find(params[:id])

      f = StringIO.new(deck.contents)

      deck_list = f.each_line.reduce([]) do |deck_list, record|
        next deck_list unless record.present?

        pattern = /^(\d+)\s(.*)$/
        match = pattern.match(record)

        quantity = match[1].to_i
        name = match[2].strip

        deck_list << { quantity: quantity, name: name }
      end

      results = LoadDeck.new.load_deck(deck_list)

      order = results[:order].map do |line_item|
        "#{line_item[:quantity]} #{line_item[:name]}"
      end.join("\n")

      picklist = results[:picklist].map do |line_item|
        "#{line_item[:quantity]} #{line_item[:name]} #{line_item[:card_set]}"
      end.join("\n")

      render json: { order: order, picklist: picklist }
    end

    private

    def present_decks(decks)
      decks.reduce({}) do |memo, deck|
        memo.merge(deck.id.to_s => present_deck(deck))
      end
    end

    def present_deck(deck)
      {
        id: deck.id.to_s,
        name: deck.name,
        contents: deck.contents,
        tags: deck.tags.pluck(:id).map(&:to_s)
      }
    end
  end
end
