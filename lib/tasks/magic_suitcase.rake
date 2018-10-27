require 'csv'

namespace :magic_suitcase do
  desc "Load Card Set"
  task :load_card_set, [:card_set_abbreviation] => :environment do |_, args|
    file_path = File.join(Rails.root, 'card_sets', "#{args[:card_set_abbreviation]}.csv")

    CSV.foreach(file_path) do |record|
      card_set_abbreviation = record[0]
      card_set = CardSet.find_by(abbreviation: card_set_abbreviation.upcase)
      if card_set.nil?
        raise "Unabled to find card_set for [#{card_set_abbreviation}]"
      end

      card_name = record[1]
      card = Card.find_or_initialize_by(card_set: card_set, name: card_name)
      if card.persisted?
        puts "Found card for [#{card_set_abbreviation}, #{card_name}]"
      else
        card.save!
      end
    end
  end

  desc "Load Deck"
  task :load_deck, [:deck_name] => :environment do |_, args|
    file_path = File.join(Rails.root, 'decks', "#{args[:deck_name]}.txt")

    deck_list = File.open(file_path).reduce([]) do |deck_list, f|
      f.each_line.reduce(deck_list) do |deck_list, record|
        next deck_list unless record.present?

        pattern = /^(\d+)\s(.*)$/
        match = pattern.match(record)

        quantity = match[1].to_i
        name = match[2].strip

        deck_list << { quantity: quantity, name: name }
      end
    end

    results = LoadDeck.new.load_deck(deck_list)

    puts "# ORDER"
    puts "#{results[:order].map do |line_item|
      "#{line_item[:quantity]} #{line_item[:name]}"
    end.join("\n")}"

    puts

    puts "# PICKLIST"
    puts "#{results[:picklist].map do |line_item|
      "#{line_item[:quantity]} #{line_item[:name]} #{line_item[:card_set]}"
    end.join("\n")}"
  end
end
