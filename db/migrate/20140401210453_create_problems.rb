class CreateProblems < ActiveRecord::Migration
  def self.up
    create_table :problems do |t|
      t.string :name
      t.integer :state_id
      t.string :city_id
      t.string :neighborhood_id
      t.integer :polygon_id
      t.text :description
      t.string :cause
      t.string :effects
      t.integer :costs
      t.string :frecuency
      t.integer :affects_to
      t.integer :houses
      t.integer :affected_population
      t.integer :category_id
      t.integer :user_id
      t.boolean :public
      t.integer :votes_count
      t.timestamps
    end
  end

  def self.down
    drop_table :problems
  end
end
