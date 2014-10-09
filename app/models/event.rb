class Event < ActiveRecord::Base
  attr_accessible :name, :start_date, :end_date, :description, :actor_ids, :participants, :total, :hour, :place, :rango, :actor_id, :polygon_id
  belongs_to :actor
  has_many :actors, :through => :actors_events
  has_many :actors_events
end
