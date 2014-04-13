class AddAlternativeTable < ActiveRecord::Migration
  def change
    create_table :actors_alternatives, :id => false do |t|
	  t.integer :alternative_id
	  t.integer :actor_id
	end
  end
end
