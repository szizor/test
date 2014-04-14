class CreateProblemsAgeRanges < ActiveRecord::Migration
  def change
  	create_table :problems_age_ranges, :id => false do |t|
      t.integer :problem_id
      t.integer :age_range_id
    end
  end
end
