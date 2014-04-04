class AddAgeRangesToPolygons < ActiveRecord::Migration
  def change
  	add_column :polygons, :promedio, :integer
    add_column :polygons, :cero_doce, :integer
    add_column :polygons, :doce_catorce, :integer
    add_column :polygons, :quince_diecinueve, :integer
    add_column :polygons, :veinte_veinticuatro, :integer
    add_column :polygons, :veinticinco_veintinueve, :integer
    add_column :polygons, :treinta_cincuentainueve, :integer
    add_column :polygons, :sesenta, :integer
    add_column :polygons, :rutas, :text
    add_column :polygons, :colors, :text
  end
end
