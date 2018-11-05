class DropDeckCards < ActiveRecord::Migration[5.2]
  def change
    drop_table :deck_cards
  end
end
