class AddGroupsTable < ActiveRecord::Migration
  def self.up
    create_table :groups do |t|
      t.string :name
      t.string :age
      t.string :gender
      t.string :email
      t.string :profesion
      t.string :phone
      t.string :cell_phone
      t.integer :polygon_id
      t.timestamps
    end
  end

  def self.down
    drop_table :groups
  end
end
