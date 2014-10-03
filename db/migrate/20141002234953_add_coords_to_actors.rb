class AddCoordsToActors < ActiveRecord::Migration
  def change
    add_column :actors, :coords, :text
  end
end
