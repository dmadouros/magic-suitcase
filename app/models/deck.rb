class Deck < ApplicationRecord
  has_many :deck_tags
  has_many :tags, through: :deck_tags
end
