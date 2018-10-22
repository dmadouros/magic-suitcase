class AddSortIndexToColors < ActiveRecord::Migration[5.2]
  def change
    add_column :colors, :sort_index, :integer
  end
end
