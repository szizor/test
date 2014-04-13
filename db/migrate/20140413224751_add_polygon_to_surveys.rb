class AddPolygonToSurveys < ActiveRecord::Migration
  def change
    add_column :surveys, :polygon_id, :integer
  end
end
