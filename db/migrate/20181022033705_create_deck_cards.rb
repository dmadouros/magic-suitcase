class CreateDeckCards < ActiveRecord::Migration[5.2]
  def change
    create_table :deck_cards do |t|
      t.references :card, foreign_key: true
      t.references :deck, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
