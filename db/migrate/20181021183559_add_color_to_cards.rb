class AddColorToCards < ActiveRecord::Migration[5.2]
  def change
    add_reference :cards, :color, foreign_key: true
  end
end
