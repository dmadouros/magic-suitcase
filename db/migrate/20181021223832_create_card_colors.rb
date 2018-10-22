class CreateCardColors < ActiveRecord::Migration[5.2]
  def change
    create_table :card_colors do |t|
      t.references :card, foreign_key: true
      t.references :color, foreign_key: true
    end
  end
end
