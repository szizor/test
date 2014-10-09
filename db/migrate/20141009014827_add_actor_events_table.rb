class AddActorEventsTable < ActiveRecord::Migration
  def change
    create_table :actors_events, :id => false do |t|
	  t.integer :actor_id
	  t.integer :event_id
	end
  end
end
