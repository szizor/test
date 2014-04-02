class CreatePolygons < ActiveRecord::Migration
  def self.up
    create_table :polygons do |t|
      t.string :name
      t.text :coords
      t.integer :population
      t.integer :women_pop
      t.integer :men_pop
      t.integer :life_span
      t.string :ses
      t.string :scholarity
      t.text :prod_act
      t.text :econ_act
      t.integer :state_id
      t.string :city_id
      t.string :neighborhood
      t.timestamps
    end
  end

  def self.down
    drop_table :polygons
  end
end
