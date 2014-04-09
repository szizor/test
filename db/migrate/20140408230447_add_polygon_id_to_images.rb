class AddPolygonIdToImages < ActiveRecord::Migration
  def change
    add_column :images, :polygon_id, :integer
  end
end
