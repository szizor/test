class AddFieldsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :participants, :integer
    add_column :events, :total, :integer
    add_column :events, :actor_id, :integer
    add_column :events, :hour, :string
    add_column :events, :place, :string
    add_column :events, :rango, :string
    add_column :events, :polygon_id, :inteer
  end
end
