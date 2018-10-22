class AddSortIndexToCardTypes < ActiveRecord::Migration[5.2]
  def change
    add_column :card_types, :sort_index, :integer
  end
end
