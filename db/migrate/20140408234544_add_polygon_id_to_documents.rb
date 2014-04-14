class AddPolygonIdToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :polygon_id, :integer
    add_column :documents, :file, :string
  end
end
