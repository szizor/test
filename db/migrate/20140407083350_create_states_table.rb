class CreateStatesTable < ActiveRecord::Migration
  def change
    create_table :estados do |t|
      t.string :clave, :limit => 2
      t.string :nombre, :limit => 45
      t.string :abrev, :limit => 16

      t.timestamps
    end
  end
end
