class AddDesciptionToActors < ActiveRecord::Migration
  def change
    add_column :actors, :description, :text
  end
end
