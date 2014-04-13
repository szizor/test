class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string :name
      t.timestamp :start_date
      t.timestamp :end_date
      t.text :description
      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
