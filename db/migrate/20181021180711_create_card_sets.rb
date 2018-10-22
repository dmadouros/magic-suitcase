class CreateCardSets < ActiveRecord::Migration[5.2]
  def change
    create_table :card_sets do |t|
      t.string :name, null: false
      t.string :abbreviation, null: false

      t.timestamps
    end
  end
end
