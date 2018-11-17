class CreateDeckTags < ActiveRecord::Migration[5.2]
  def change
    create_table :deck_tags do |t|
      t.references :deck, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps
    end
  end
end
