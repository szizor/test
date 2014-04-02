class CreateAlternativeAgeRange < ActiveRecord::Migration
  def change
  	create_table :alternatives_age_ranges, :id => false do |t|
      t.integer :alternative_id
      t.integer :age_range_id
    end
  end
end
