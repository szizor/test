class ActorsEvent < ActiveRecord::Base
  attr_accessible :event_id, :actor_id
  belongs_to :actor
  belongs_to :event
end