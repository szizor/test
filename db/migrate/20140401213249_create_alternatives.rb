class CreateAlternatives < ActiveRecord::Migration
  def self.up
    create_table :alternatives do |t|
      t.string :name
      t.text :description
      t.integer :population
      t.integer :budget_expected
      t.integer :assigned_budget
      t.timestamp :start_date
      t.timestamp :end_date
      t.integer :actor_id
      t.integer :user_id
      t.boolean :project
      t.timestamps
    end
  end

  def self.down
    drop_table :alternatives
  end
end
