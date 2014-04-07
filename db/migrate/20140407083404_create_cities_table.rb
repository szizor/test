class CreateCitiesTable < ActiveRecord::Migration
  def change
    create_table :municipios do |t|
      t.integer :estado_id, :limit => 4
      t.string :clave, :limit => 6
      t.string :nombre, :limit => 50
      t.string :sigla, :limit => 4
      t.timestamps
    end
  end
end
