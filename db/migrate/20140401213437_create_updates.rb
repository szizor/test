class CreateUpdates < ActiveRecord::Migration
  def self.up
    create_table :updates do |t|
      t.string :name
      t.text :description
      t.integer :alternative_id
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :updates
  end
end
