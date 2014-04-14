class AddFieldsToActors < ActiveRecord::Migration
  def change
  	add_column :actors, :state_id, :integer
    add_column :actors, :city, :string
    add_column :actors, :user_id, :integer
  end
end
