class CreateTrees < ActiveRecord::Migration
  def self.up
    create_table :trees do |t|
      t.string :name
      t.string :visible
      t.integer :polygon_id
      t.string :file
      t.timestamps
    end
  end

  def self.down
    drop_table :trees
  end
end
