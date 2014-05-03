class AddPolygonIdToSurveys < ActiveRecord::Migration
  def change
    change_column :surveys, :polygon_id, :integer, after: :user_id
  end
end
