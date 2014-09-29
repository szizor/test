class AddColorsToTours < ActiveRecord::Migration
  def change
    add_column :tours, :colors, :text
  end
end
