class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.integer :quantity, null: false, default: 0
      t.references :card_set, foreign_key: true, null: false

      t.timestamps
    end
  end
end
