class DeckTag < ApplicationRecord
  belongs_to :deck
  belongs_to :tag
end
