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
end
