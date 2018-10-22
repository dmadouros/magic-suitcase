class Card < ApplicationRecord
  belongs_to :card_set
  belongs_to :card_type
  has_many :card_colors
  has_many :colors, through: :card_colors
end
