class AddNullConstraintToColorsSortIndex < ActiveRecord::Migration[5.2]
  def change
    change_column_null :colors, :sort_index, false
  end
end
