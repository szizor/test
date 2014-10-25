class ChangeDateFormatInMyTable < ActiveRecord::Migration
  def up
    change_column :problems, :cause, :text
    change_column :problems, :effects, :text
  end

  def down
    change_column :problems, :cause, :string
    change_column :problems, :effects, :string
  end
end
