class CreateJoinTable < ActiveRecord::Migration
  def change
  	create_table :polygons_age_ranges, :id => false do |t|
      t.integer :polygon_id
      t.integer :age_range_id
    end
  end
end
