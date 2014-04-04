class AddAgeRangeToProblems < ActiveRecord::Migration
  def change
  	add_column :problems, :cero_doce, :integer
    add_column :problems, :doce_catorce, :integer
    add_column :problems, :quince_diecinueve, :integer
    add_column :problems, :veinte_veinticuatro, :integer
    add_column :problems, :veinticinco_veintinueve, :integer
    add_column :problems, :treinta_cincuentainueve, :integer
    add_column :problems, :sesenta, :integer
    add_column :problems, :coords, :text
    add_column :problems, :colors, :text
  end
end
