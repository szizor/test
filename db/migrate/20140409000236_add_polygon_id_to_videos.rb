class AddPolygonIdToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :polygon_id, :string
    add_column :videos, :url, :string
  end
end
