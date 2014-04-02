class CreateTours < ActiveRecord::Migration
  def self.up
    create_table :tours do |t|
      t.string :name
      t.text :description
      t.text :coordinates
      t.integer :polygon_id
      t.timestamp :start_date
      t.timestamps
    end
  end

  def self.down
    drop_table :tours
  end
end
