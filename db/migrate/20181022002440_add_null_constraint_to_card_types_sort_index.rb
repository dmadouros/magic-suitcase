class AddNullConstraintToCardTypesSortIndex < ActiveRecord::Migration[5.2]
  def change
    change_column_null :card_types, :sort_index, false
  end
end
